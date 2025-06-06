"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleOAuth = async (
    provider: "google" | "github" | "facebook" | "linkedin"
  ) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) alert("OAuth error: " + error.message);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else window.location.href = "/home";
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) alert(error.message);
    else {
      alert("Check your email for the confirmation link!");
      setIsSignUp(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return alert("Please enter your email.");

    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) alert("Error sending reset email: " + error.message);
    else {
      alert("Password reset email sent! Check your inbox.");
      setShowForgotPassword(false);
      setForgotEmail("");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-background w-full'>
      <div className='min-h-screen w-[50%] flex items-center justify-center bg-lime-50 px-4'>
        {/* {!isSignUp ? (
          <>
            {showForgotPassword ? (
              <form
                onSubmit={handleForgotPasswordSubmit}
                className='max-w-md w-full p-6 bg-white rounded-lg shadow-md space-y-6'
              >
                <input
                  type='email'
                  name='forgotEmail'
                  placeholder='Enter your email'
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button
                  type='submit'
                  className='w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition'
                >
                  Send reset link
                </button>
                <button
                  type='button'
                  onClick={() => setShowForgotPassword(false)}
                  className='w-full text-sm text-blue-600 hover:underline'
                >
                  Back to login
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleLogin}
                className='max-w-md w-full p-6 bg-white rounded-lg shadow-md space-y-6'
              >
                <input
                  name='email'
                  type='email'
                  placeholder='Email'
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <Button
                  variant='default'
                  type='submit'
                  className='w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition'
                >
                  Login
                </Button>
                <div className='flex flex-row  justify-end w-full'>
                  <Button
                    type='button'
                    onClick={() => setIsSignUp(true)}
                    className='w-full text-sm text-blue-600 hover:underline text-start'
                  >
                    Sign-up
                  </Button>
                  <Button
                    type='button'
                    onClick={() => setShowForgotPassword(true)}
                    className='w-full text-sm text-blue-600 hover:underline text-end'
                  >
                    Forgot password?
                  </Button>
                </div>
              </form>
            )}
          </>
        ) : (
          <form
            onSubmit={handleSignUp}
            className='max-w-md w-full p-6 bg-white rounded-lg shadow-md space-y-6'
          >
            <h2 className='text-2xl font-semibold text-center'>Sign Up</h2>
            <input
              name='email'
              type='email'
              placeholder='Email'
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <input
              name='password'
              type='password'
              placeholder='Password'
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <Button
              type='submit'
              className='w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition'
            >
              Sign Up
            </Button>
            <Button
              type='button'
              onClick={() => setIsSignUp(false)}
              className='w-full text-center text-green-600 hover:underline'
            >
              Already have an account? Login
            </Button>
          </form>
        )} */}
      </div>
      <div className='min-h-screen w-[50%]  flex items-center justify-center  '>
        {!isSignUp ? (
          <>
            {showForgotPassword ? (
              <form
                onSubmit={handleForgotPasswordSubmit}
                className='max-w-md w-full p-6  space-y-6'
              >
                <input
                  type='email'
                  name='forgotEmail'
                  placeholder='Enter your email'
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button
                  type='submit'
                  className='w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition'
                >
                  Send reset link
                </button>
                <button
                  type='button'
                  onClick={() => setShowForgotPassword(false)}
                  className='w-full text-sm text-blue-600 hover:underline'
                >
                  Back to login
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleLogin}
                className='max-w-md w-full p-6 space-y-2'
              >
                <Input
                  name='email'
                  type='email'
                  placeholder='Email'
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500'
                  autoComplete='off'
                />
                <Input
                  name='password'
                  type='password'
                  placeholder='Password'
                  required
                  className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500'
                />
                <Button
                  variant='default'
                  type='submit'
                  className='w-full bg-lime-700 text-white py-3 rounded-md hover:bg-lime-600 transition'
                >
                  Login
                </Button>
                <div className='flex flex-row justify-center'>
                  <Button
                    variant='ghost'
                    type='button'
                    onClick={() => setIsSignUp(true)}
                    className='w-full text-sm text-lime-600 hover:underline'
                  >
                    Sign-up
                  </Button>
                  <Button
                    variant='ghost'
                    type='button'
                    onClick={() => setShowForgotPassword(true)}
                    className='w-full text-sm text-lime-600 hover:underline'
                  >
                    Forgot password?
                  </Button>
                </div>
                {/* <div className='flex items-center justify-between'>
                <hr className='flex-grow border-gray-300' />
                <span className='mx-2 text-gray-500'>or</span>
                <hr className='flex-grow border-gray-300' />
              </div> */}
              </form>
            )}
          </>
        ) : (
          <form
            onSubmit={handleSignUp}
            className='max-w-md w-full p-6  space-y-6'
          >
            <h2 className='text-2xl font-semibold text-center'>Sign Up</h2>
            <input
              name='email'
              type='email'
              placeholder='Email'
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <input
              name='password'
              type='password'
              placeholder='Password'
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
            />
            <Button
              type='submit'
              className='w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition'
            >
              Sign Up
            </Button>
            <Button
              variant='ghost'
              type='button'
              onClick={() => setIsSignUp(false)}
              className='w-full text-center text-green-600 hover:underline'
            >
              Already have an account? Login
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
