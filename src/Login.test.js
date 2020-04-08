import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import axios from 'axios';
import  {Login, Submit} from './Login';
import {useHistory} from 'react-router-dom';

jest.mock('axios', ()=>({
    post : jest.fn(()=> Promise.resolve('I am resolved!'))
}));
jest.mock('react-router-dom',()=> ({
    useHistory: () => ({
        push: jest.fn(),
    }),
}));
jest.spyOn(window.localStorage.__proto__, 'setItem');

beforeEach(cleanup);

describe('Submit', () => {
    it('submits correct login data to API', ()=>{
        axios.post.mockImplementationOnce(()=> Promise.resolve('I am resolved'));
    });

    it('submits erroneous login data to API', ()=>{
        const errorMessage = "invalid credentials";
        axios.post.mockImplementationOnce(()=> Promise.reject(new Error(errorMessage)));
    });
    
});

describe('<Login/>', () => {
    describe('Success', () => {
        it('renders <Login/> form container', ()=>{
            const {queryByTestId} = render(<Login/>);
            expect(queryByTestId('login-form-container')).toBeTruthy();
        });
        it('renders <Login/> form', ()=>{
            const {queryByTestId} = render(<Login/>);
            expect(queryByTestId('login-form')).toBeTruthy();
        });
        it('renders <Login/> and submits login credentials using onClick', ()=> {
            const {queryByTestId} = render(<Login/>);
            expect(queryByTestId('login-form')).toBeTruthy();

            fireEvent.change(queryByTestId('username-input'), {
                target: {value: 'username'},
            });
            expect(queryByTestId('username-input').value).toBe(
                'username'
            );
            fireEvent.change(queryByTestId('password-input'), {
                target: {value: 'password'},
            });
            expect(queryByTestId('password-input').value).toBe(
                'password'
            );
            fireEvent.click(queryByTestId('login-submit'));
        });
        
    });
    
});


