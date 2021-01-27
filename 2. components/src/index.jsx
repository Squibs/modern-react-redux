import React from 'react';
import ReactDOM from 'react-dom';
import faker from 'faker';

import CommentDetail from './CommentDetail';
import ApprovalCard from './ApprovalCard';

const App = () => {
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <h4>Warning!</h4>
        Are you sure you want to do this?
      </ApprovalCard>

      <ApprovalCard>
        <CommentDetail author="Sam" timeAgo="Today at 4:45PM" avatar={faker.random.image()} content="Is that even a real mouse?" />
      </ApprovalCard>

      <ApprovalCard>
        <CommentDetail author="Jacob" timeAgo="Today at 2:00PM" avatar={faker.random.image()} content="Where did I put my keys?" />
      </ApprovalCard>

      <ApprovalCard>
        <CommentDetail author="Samantha" timeAgo="Today at 5:00PM" avatar={faker.random.image()} content="That's a nice house!" />
      </ApprovalCard>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

// linked in public/index.html head
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"></link>
