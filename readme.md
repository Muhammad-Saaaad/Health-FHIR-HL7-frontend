## **Installation Libraries**

* React router dom `npm install react-router-dom`
* tailwindcss `npm install tailwindcss @tailwindcss/vite` and then go to vite.config.js and add `tailwindcss()` in `plugin` list.
* React Query | Tanstackquery for managing api calls instead of using manual (useState, useEffect, loading, error handling, caching, etc) `npm i @tanstack/react-query`
* axios `npm install axios`
* lucide-react `npm install lucide-react`
* date picker `npm install react-datepicker`
* tailwind-merge for overriding styles `npm install tailwind-merge`
* concurrenetly for running all the servers at the same time `npm install concurrently --save-dev`


## **Moving data between Screens**

1. `useLocation` from `react-router-dom`. Example

**Sending Side**

    import { useNavigate } from 'react-router-dom';
    function Screen1() {

        const navigate = useNavigate();

        const handleClick = () => {
            const userData = {
                name: "John Doe",
                age: 25,
                email: "john@example.com"
            };

            navigate('/screen2', { state: userData });
        };

        return <button onClick={handleClick}>Go to Screen 2</button>;
    }

**Receiving Data**

    import { useLocation } from 'react-router-dom';

    function Screen2() {
        const location = useLocation();
        const userData = location.state;  // Get the data

        return (
            <div>
                <h1>Name: {userData.name}</h1>
                <p>Age: {userData.age}</p>
                <p>Email: {userData.email}</p>
            </div>
        );
    }

---


2. Using `URL Parameter` this show data in `url`

**Sending Side** 

    import { useNavigate } from 'react-router-dom';

    function Screen1() {
        const navigate = useNavigate();

        const handleClick = () => {
            const userId = 123;
            navigate(`/screen2/${userId}`);  // Send as URL param
        };

        return <button onClick={handleClick}>Go to Screen 2</button>;
    }

**Router Setup**

    import { BrowserRouter, Routes, Route } from 'react-router-dom';

    <BrowserRouter>
        <Routes>
            <Route path="/screen1" element={<Screen1 />} />
            <Route path="/screen2/:userId" element={<Screen2/>} 
            />  {/* :userId is dynamic */}
        </Routes>
    </BrowserRouter>

**Receiving Side**

    import { useParams } from 'react-router-dom';

    function Screen2() {
        const { userId } = useParams();  // Get the userId from URL

        return <div>User ID: {userId}</div>;
    }

---

3. `Query Parameter` user can see data in `url`.

**Sending Side**

    import { useNavigate } from 'react-router-dom';

    function Screen1() {
        const navigate = useNavigate();

        const handleClick = () => {
            navigate('/screen2?name=John&age=25&role=admin');
        };

        return <button onClick={handleClick}>Go to Screen 2</button>;
    }


**Receiving Side**

    import { useSearchParams } from 'react-router-dom';

    function Screen2() {
        const [searchParams] = useSearchParams();
        
        const name = searchParams.get('name');
        const age = searchParams.get('age');
        const role = searchParams.get('role');

        return (
            <div>
                <p>Name: {name}</p>
                <p>Age: {age}</p>
                <p>Role: {role}</p>
            </div>
        );
    }