import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'

class TodoForm extends Component {
    renderField = ({ input, label, meta: { touched, error } }) => {
        return (
          <div className={`field ${touched && error ? 'error' : ''}`}>
            <label>{label}</label>
            <input {...input} autoComplete='off' />
            {touched && error && (
				<span className='ui pointing red basic label'>{error}</span>
            )}
          </div>
        );
	};
//test-rebase
    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }
    render() {
		const btn_text = this.props.initialValues ? 'Update': 'Add';
        return (
            <div className="ui segment">
                <form
                className="ui form er"
                    onSubmit = {this.props.handleSubmit(this.onSubmit)}
                >
                    <Field component={this.renderField} name="task" label="task">

                    </Field>
                    <button className="ui button primary">{btn_text}</button>
                </form>
            </div>
        )
    }
}
const validate = formValues => {
    const errors = {};
  
    if (!formValues.task) {
      errors.task = 'Please enter at least 1 character';
    }
  
    return errors;
  };
  
export default reduxForm({
    form: 'todoForm',
    touchOnBlur: false,
    validate
})(TodoForm)