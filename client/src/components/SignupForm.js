// import React, { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';

// // import { createUser } from '../utils/API';
// import Auth from '../utils/auth';

// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';

// const SignupForm = () => {
//   // set initial form state
//   const [userFormData, setUserFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });
//   const [addUser, { error }] = useMutation(ADD_USER);
//   // set state for form validation
//   const [validated] = useState(false);
//   // set state for alert
//   const [showAlert, setShowAlert] = useState(false);

//   const handleInputChange = event => {
//     const { name, value } = event.target;
//     setUserFormData({ ...userFormData, [name]: value });
//   };

//   const handleFormSubmit = async event => {
//     event.preventDefault();

//     // check if form has everything (as per react-bootstrap docs)
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     try {
//       const response = await addUser({ variables: { ...userFormData } });

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }

//       const { token, user } = await response.json();
//       console.log(user);
//       Auth.login(user.addUser.token);
//     } catch (err) {
//       console.error(err);
//       setShowAlert(true);
//     }

//     setUserFormData({
//       username: '',
//       email: '',
//       password: '',
//     });
//   };

//   return (
//     <>
//       {/* This is needed for the validation functionality above */}
//       <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
//         {/* show alert if server response is bad */}
//         <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
//           Something went wrong with your signup!
//         </Alert>

//         <Form.Group>
//           <Form.Label htmlFor='username'>Username</Form.Label>
//           <Form.Control
//             type='text'
//             placeholder='Your username'
//             name='username'
//             onChange={handleInputChange}
//             value={userFormData.username}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label htmlFor='email'>Email</Form.Label>
//           <Form.Control
//             type='email'
//             placeholder='Your email address'
//             name='email'
//             onChange={handleInputChange}
//             value={userFormData.email}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label htmlFor='password'>Password</Form.Label>
//           <Form.Control
//             type='password'
//             placeholder='Your password'
//             name='password'
//             onChange={handleInputChange}
//             value={userFormData.password}
//             required
//           />
//           <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
//         </Form.Group>
//         <Button
//           disabled={!(userFormData.username && userFormData.email && userFormData.password)}
//           type='submit'
//           variant='success'>
//           Submit
//         </Button>
//       </Form>
//       {error && <div>Sign up failed</div>}
//     </>
//   );
// };

// export default SignupForm;

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const SignUpForm = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>

            {error && <div>Signup failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUpForm;