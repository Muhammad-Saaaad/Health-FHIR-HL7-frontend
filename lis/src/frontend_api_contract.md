# LIS Frontend API Contract

This file summarizes the LIS API surface for frontend integration.

## Base Service

- Service: Laboratory Information System (LIS)
- Default port: `8002`
- CORS: `*` for origins, headers, methods, and credentials
- App entrypoint: `LIS/main.py`

## Notes for Frontend Integration

- All routes below are mounted directly, without a prefix, unless the router file adds one internally. In this codebase, the routes are declared exactly as shown.
- The authentication routes use capitalized paths: `/SignUp` and `/Login`.
- The response models use Pydantic serialization, so date fields may be formatted as human-readable strings in some endpoints.
- Some endpoints are internal service-to-service endpoints used by the InterfaceEngine. They are documented here for completeness, but the frontend should not call them directly.

## Authentication API

### POST /SignUp

Register a new LIS user.

Request body:

```json
{
  "user_name": "john.doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

Fields:
- `user_name`: string, required
- `email`: valid email string, required
- `password`: string, required

Response: `201 Created`

```json
{
  "user_id": 1,
  "user_name": "john.doe",
  "email": "john@example.com"
}
```

Errors:
- `400 Bad Request` if email already exists

### POST /Login

Authenticate a user.

Request body:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

Response: `200 OK`

```json
{
  "user_id": 1,
  "user_name": "john.doe",
  "email": "john@example.com"
}
```

Errors:
- `404 Not Found` if email does not exist
- `404 Not Found` if password is invalid

## Patient API

### GET /get_patients

Return all registered patients.

Response: `200 OK`

Array of:

```json
{
  "mpi": 1001,
  "fname": "Ali",
  "lname": "Khan",
  "updated_at": "April 28, 2026"
}
```

Fields:
- `mpi`: integer
- `fname`: string
- `lname`: string
- `updated_at`: formatted date string

### GET /patients/{mpi}

Return patient details and completed/accepted lab reports.

Path parameter:
- `mpi`: integer, required

Response: `200 OK`

```json
{
  "mpi": 1001,
  "fname": "Ali",
  "lname": "Khan",
  "gender": "male",
  "age": "31 years",
  "lab_reports": [
    {
      "report_id": 12,
      "test_name": "CBC",
      "vid": "VISIT-001",
      "status": "Completed"
    }
  ]
}
```

Notes:
- `age` is serialized from date of birth into a string like `31 years`.
- `lab_reports` only includes requests whose status is `Completed` or `Accepted`.

Errors:
- `404 Not Found` if patient does not exist

### GET /patient-waiting-list

Return a waiting list of pending test requests, unique by `vid`.

Response: `200 OK`

```json
[
  {
    "test_req_id": 99,
    "vid": "VISIT-001",
    "mpi": 1001,
    "fname": "Ali",
    "lname": "Khan",
    "status": "Pending",
    "date": "April 28, 2026"
  }
]
```

### GET /patient-process/{mpi}/{vid}

Return patient details with pending lab requests for a specific visit.

Path parameters:
- `mpi`: integer, required
- `vid`: string, required

Response: `200 OK`

```json
{
  "mpi": 1001,
  "fname": "Ali",
  "lname": "Khan",
  "gender": "male",
  "age": "31 years",
  "lab_reports": [
    {
      "report_id": 99,
      "test_name": "CBC",
      "vid": "VISIT-001",
      "status": "Pending"
    }
  ]
}
```

Errors:
- `404 Not Found` if no pending tests exist for the visit
- `404 Not Found` if patient MPI does not exist

### GET /patient-Accepted-list

Return accepted test requests, grouped in a frontend-friendly list.

Response: `200 OK`

```json
[
  {
    "test_req_id": 99,
    "test_name": "CBC",
    "vid": "VISIT-001",
    "mpi": 1001,
    "fname": "Ali",
    "lname": "Khan",
    "status": "Accepted",
    "date": "April 28, 2026"
  }
]
```

## Test Request API

### GET /requests/accepted/payment/paid

Return test requests that are both accepted and paid.

Response: `200 OK`

Array of:

```json
{
  "test_req_id": 99,
  "mpi": 1001,
  "test_name": "CBC",
  "status": "Accepted",
  "locked_by": 7,
  "locked_at": "2026-04-28T10:15:00"
}
```

### PUT /requests/update_report_status

Bulk update test request statuses and create billing rows.

Request body:

```json
{
  "req_id_status": {
    "99": "Accepted",
    "100": "Declined"
  },
  "req_id_bill": {
    "99": 1200.0,
    "100": 900.0
  },
  "user_id": 7,
  "visit_id": "VISIT-001"
}
```

Fields:
- `req_id_status`: map of request ID to new status
- `req_id_bill`: map of request ID to billing amount
- `user_id`: integer technician ID
- `visit_id`: string visit identifier

Valid status values:
- `Pending`
- `Accepted`
- `Declined`
- `Completed`

Response: `200 OK`

Returns a list of updated test requests.

Errors:
- `400 Bad Request` for invalid status values, mismatched visit IDs, or negative bill amounts
- `403 Forbidden` if request is unlocked or locked by another technician
- `404 Not Found` for missing visit or request IDs

### PUT /requests/lock_test_request/visit_id/{visit_id}/user_id/{user_id}

Lock all lab requests for a visit to a technician.

Path parameters:
- `visit_id`: string, required
- `user_id`: integer, required

Response: `200 OK`

Returns a list of locked test requests.

Errors:
- `403 Forbidden` if a request is locked by another technician
- `404 Not Found` if the visit does not exist or user does not exist

### PUT /requests/unlock_test_request/visit_id/{visit_id}/user_id/{user_id}

Unlock all lab requests for a visit.

Path parameters:
- `visit_id`: string, required
- `user_id`: integer, required

Response: `200 OK`

Returns a list of unlocked test requests.

Errors:
- `403 Forbidden` if the request is locked by another technician
- `404 Not Found` if the visit or user does not exist

## Result API

### POST /results/complete

Submit a complete lab result for an accepted test request.

Request body:

```json
{
  "user_id": 7,
  "test_req_id": 99,
  "description": "Normal findings",
  "mini_tests": [
    {
      "test_name": "Hemoglobin",
      "normal_range": "13.5-17.5 g/dL",
      "units": "g/dL",
      "result_value": "14.2"
    }
  ]
}
```

Fields:
- `user_id`: integer, required
- `test_req_id`: integer, required
- `description`: string, optional
- `mini_tests`: array of mini-test objects, required

Response: `201 Created`

```json
{
  "message": "result added"
}
```

Side effects:
- Marks the related test request as `Completed`
- Creates one mini-result row per `mini_tests` entry

Errors:
- `404 Not Found` if user does not exist
- `404 Not Found` if test request does not exist
- `404 Not Found` if test request is not `Accepted`
- `400 Bad Request` if a result already exists

### GET /results/test_req_id/{test_req_id}

Return the complete result for a test request.

Path parameter:
- `test_req_id`: integer, required

Response: `200 OK`

```json
{
  "result_id": 1,
  "user_id": 7,
  "test_req_id": 99,
  "description": "Normal findings",
  "mini_test_results": [
    {
      "mini_test_id": 1,
      "test_name": "Hemoglobin",
      "normal_range": "13.5-17.5 g/dL",
      "units": "g/dL",
      "result_value": "14.2"
    }
  ]
}
```

If there are no mini-test rows, the response may omit `mini_test_results` or leave it null.

Errors:
- `404 Not Found` if no result exists for the request ID

### PUT /requests/lock_test/{test_req_id}/user_id/{user_id}

Lock a test request by request ID.

Path parameters:
- `test_req_id`: integer, required
- `user_id`: integer, required

Response: `200 OK`

Returns the locked test request object.

Errors:
- `403 Forbidden` if locked by a different technician
- `404 Not Found` if the request does not exist or user does not exist

### PUT /requests/unlock_test_request/test_req_id/{test_req_id}/user_id/{user_id}

Unlock a test request by request ID.

Path parameters:
- `test_req_id`: integer, required
- `user_id`: integer, required

Response: `200 OK`

Returns the unlocked test request object.

Errors:
- `403 Forbidden` if the request is locked by another technician
- `404 Not Found` if the request does not exist or user does not exist

## Internal Engine Endpoints

These are included in the LIS app but are intended for the InterfaceEngine, not for frontend calls.

### POST /get/new-patient

Accepts a raw HL7 message body and creates a patient record.

Response:
- `200 OK` with `{ "message": "Patient Added sucessfully" }`

### POST /take_lab_order

Accepts a raw HL7 lab order message and creates LIS test requests.

Response examples:
- `{ "message": "Lab order received successfully" }`
- `{ "message": "No lab orders found in the message" }`
- `{ "message": "MPI <id> not found in the database" }`

## Frontend Integration Summary

Recommended frontend flow:

1. Sign up or log in a technician.
2. Fetch patient and waiting-list data.
3. Lock a request before editing or processing it.
4. Update request status and billing.
5. Submit the final result.
6. Unlock the request after completion.

## Implementation Caveats

- The current codebase uses plaintext password comparison in `/Login`.
- The endpoint naming is inconsistent in a few places, so the frontend should use the exact paths listed above.
- Some API responses are returned directly from SQLAlchemy models, while others are assembled dicts or Pydantic schemas.
