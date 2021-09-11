import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RelatedContainer from './RelatedContainer/RelatedContainer.jsx';

function App() {
  return (
    <div>
      <RelatedContainer />
      <Card style={{ width: '22rem' }}>
        <Card.Body>
          <Card.Title style={{ color: 'green' }}>GEEKSFORGEEKS</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            One Stop For all CS subjects
          </Card.Subtitle>
          <Card.Text>
            GeeksforGeeks provides a platform for all the students to study
            about all the subjects in CSE.
          </Card.Text>
          <Card.Link href="#"> For Students</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
