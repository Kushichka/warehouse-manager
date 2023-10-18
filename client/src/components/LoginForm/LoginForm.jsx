import { useState } from 'react';
import axios from 'axios';

import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

export const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }

    const submitHandler = async () => {
        setLoading(true);

        try {
            const {data} = await axios.get(`http://localhost:5000/api/users/login/${email}`);  

            console.log(data);
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
                    Log-in to your account
                </Header>

                <Form size='large' onSubmit={submitHandler}>
                    <Segment stacked>

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
                            Login
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}