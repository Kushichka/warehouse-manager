import { useState } from 'react';
import axios from 'axios';

import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

export const RegistrationForm = () => {

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const loginHandler = (e) => {
        setLogin(e.target.value);
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const submitHandler = async () => {
        setLoading(true);

        try {
            await axios.post('http://localhost:5000/api/users/registration', { login, email});
            
            console.log('User was successfully registered!');
        } catch (error) {
            console.log('User was not registered ', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Sign up your account
                </Header>

                <Form size='large' onSubmit={submitHandler}>
                    <Segment stacked>
                        <Form.Input 
                            onChange={loginHandler}
                            value={login}
                            fluid 
                            icon='user' 
                            iconPosition='left' 
                            placeholder='Login'
                        />

                        <Form.Input
                            onChange={emailHandler}
                            value={email}
                            fluid
                            icon='mail'
                            iconPosition='left'
                            placeholder='Email'
                            type='email'
                        />

                        <Button loading={loading} color='teal' fluid size='large'>
                            Sign Up
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}