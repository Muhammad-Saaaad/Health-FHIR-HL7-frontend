import Label from "../components/label";
import Textbox from "../components/textbox";
import Button from "../components/button";

export default function Signup() {
    return (
        <div className="p-2 sm:p-5 md:p-8">
            <Label>Name</Label>
            <Textbox placeholder="Enter your name"></Textbox>
            <br />
            <Label>Email</Label>
            <Textbox placeholder="Enter your email"></Textbox>
            <br />
            <Label>Password</Label>
            <Textbox placeholder="Enter your password"></Textbox>
            <br />
            <Button text="Sign Up"></Button>
        </div>
    )
}