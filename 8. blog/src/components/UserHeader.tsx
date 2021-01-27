import React from 'react';
import { connect } from 'react-redux';
import { User } from '../actions';
import { AppState } from '../reducers';

interface UserHeaderPropsI {
  userId: number;
}

type Props = UserHeaderPropsI & LinkStateProps;

// eslint-disable-next-line react/prefer-stateless-function
class UserHeader extends React.Component<Props> {
  render(): JSX.Element {
    const { user } = this.props;

    if (!user) {
      return <div />; // null
    }

    return <div className="header">{user.name}</div>;
  }
}

interface LinkStateProps {
  user: User | undefined;
}

// prettier-ignore
const mapStateToProps = (state: AppState, ownProps: UserHeaderPropsI): LinkStateProps => {
  return { user: state.users.find((u) => u.id === ownProps.userId) };
};

// prettier-disable
export default connect(mapStateToProps)(UserHeader);
