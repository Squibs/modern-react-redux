import React from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';

import { streamsOperations } from '../../state/ducks/streams';
import { StreamsState } from '../../state/ducks/streams/types';
import { AppState } from '../../state/store';

/* ------------------------------ Redux Config ------------------------------ */

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = { createStream: streamsOperations.createStream };

const connector = connect(mapStateToProps, mapDispatchToProps);

/* ---------------------------------- Types --------------------------------- */

type PropsFromRedux = ConnectedProps<typeof connector>;

// interface MyProps {}

type Props = PropsFromRedux; // & MyProps

/* -------------------------------- Component ------------------------------- */

const StreamCreate: React.FC<Props> = ({ createStream }: Props) => {
  // React Form Hook
  const {
    register: registerForm,
    handleSubmit: handleFormSubmit,
    // watch: watchFormInput,
    errors: formErrors,
  } = useForm<StreamsState>({
    mode: 'onBlur',
  }); // can put options inside ({})

  const onSubmit = (formValues: StreamsState) => {
    // console.log(formValues);
    createStream(formValues);
  };

  // console.log(watchFormInput('title')); // watch the form with (name)

  const renderLabelInput = (
    inputId: string,
    labelText: string,
    inputName: string,
    required: boolean,
    errorMessage: string,
  ): JSX.Element => {
    const errorCheck = formErrors[inputName as keyof DeepMap<StreamsState, FieldError>];

    return (
      <>
        <div className={`field ${errorCheck && 'error'}`}>
          <label htmlFor={inputId}>
            {labelText}
            <input
              id={inputId}
              name={inputName}
              ref={registerForm({ required })}
              autoComplete="off"
            />
          </label>
          <div className="ui error message">
            {errorCheck && (
              <>
                <div className="header">Error</div>
                <p role="alert" className="field error">
                  {errorMessage}
                </p>
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleFormSubmit(onSubmit)} className="ui form error">
        {renderLabelInput('createStreamTitle', 'Title', 'title', true, 'You must enter a title')}

        {renderLabelInput(
          'createStreamDescription',
          'Description',
          'description',
          true,
          'You must enter a description',
        )}

        <button type="submit" className="ui button primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default connector(StreamCreate);

// https://react-hook-form.com/get-started#Quickstart
// https://react-hook-form.com/api#useForm
