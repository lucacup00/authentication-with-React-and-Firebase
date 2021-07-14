import React from 'react';

const Login = (props) => {
	const {
		email,
		setEmail,
		password,
		setPasssword,
		handleLogin,
		handleSignup,
		hasAccount,
		setHasAccount,
		emailEroor,
		passwordError
	} = props;

	return (
		<section className="login">
			<div className="loginContainer">
				<label>Username</label>
				<input type="text" autoFoucus required value={email} onChange={(e) => e.target.value} />
				<p className="errorMsg">{emailEroor}</p>
				<input type="text" autoFoucus required value={password} onChange={(e) => e.target.value} />
				<p className="errorMsg">{passwordError}</p>

				<div classNAme="btnContainer">
				{hasAccount ?(
					<>
					
					<button onClick={handleLogin}>Sign in</button>
					<p>Don't have an account?<span onClick={() => setHasAccount (!hasAccount)}>Signu up</span></p>
					
					</>
				) :(
					<>
					 <button onClick={handleSignup}>Sign up</button>
					 <p>Have an account? <span onClick={() => setHasAccount (!hasAccount)}>Signu up>Sign in</span></p>
					 </>
				)}	
				</div>
			</div>
		</section>
	);
};

export default Login;
