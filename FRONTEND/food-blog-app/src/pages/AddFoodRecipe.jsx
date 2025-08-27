import React from 'react';
import { Form, useActionData } from 'react-router-dom';
import './AddFoodRecipe.css';

export default function AddFoodRecipe() {
  // useActionData captures any error message returned from your action
  const actionData = useActionData();

  return (
    <div className="add-recipe-container">
      <div className="add-recipe-form-wrapper">
        <h2>Add a New Recipe</h2>
        
        {/* This <Form> component does all the work! */}
        {/* 'encType' is crucial for file uploads */}
        <Form method="post" encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            {/* The "name" attribute is required for the action to read the data */}
            <input id="title" type="text" name="title" required />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time (e.g., "30 minutes")</label>
            <input id="time" type="text" name="time" required />
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">Ingredients (comma-separated)</label>
            <textarea id="ingredients" name="ingredients" required />
          </div>

          <div className="form-group">
            <label htmlFor="instructions">Instructions</label>
            <textarea id="instructions" name="instructions" rows="8" required />
          </div>

          <div className="form-group">
            <label htmlFor="file">Recipe Image</label>
            {/* Use a name that your backend (e.g., Multer) expects */}
            <input id="file" type="file" name="coverImage" required />
          </div>
          
          {/* Display validation or submission errors from the action */}
          {actionData && actionData.message && (
            <p className="error-message">{actionData.message}</p>
          )}

          <button type="submit" className="btn-submit">Add Recipe</button>
        </Form>
      </div>
    </div>
  );
}