import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

import DogModal from '../components/DogModal';

import { useQuery } from '@apollo/client';

import { QUERY_DOGS } from '../utils/queries';

const styles = {
  card: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    height: "200px",
    width: "300px",
    borderRadius: "10px",
    boxShadow: "0px 50px 70px rgba(0,0,0, 0.1)",
    margin: "10px",
  },
}



const DogsList = () => {
  const [selectedDog, setSelectedDog] = useState(false);
  const handleModalOpen = (dog) => {
    setSelectedDog(dog);
  };

  const handleModalClose = () => {
    setSelectedDog(false);
  };

  const { loading, data } = useQuery(QUERY_DOGS);

  if (loading) {
    return <div>Loading...</div>;
  }

  const dogs = data?.dogs;


  return (

    <Container>
      <Row>
        <Col className="text-center">
          <h1>Dogs Available for Adoption</h1>
        </Col>
      </Row>


      <div id="modal-root">
        {dogs && dogs.map((dog) => (


          <Col key={dog._id} className="text-center">
            <div className="card mb-3 flex-row" style={styles.card}>
              <img src={dog.picture} alt={dog.name} style={styles.image} />
              <div className="card-body">
                <h4 className="card-title">{dog.name}</h4>
                <p className="card-text">Breed: {dog.breed}</p>
                <p className="card-text">Age: {dog.age}</p>
                <Button
                  variant="outline-primary"
                  onClick={() => handleModalOpen(dog)}
                >See More Info
                </Button>
              </div>
            </div>
          </Col>
        ))}

      </div>

      {selectedDog && (
        <DogModal isOpen={selectedDog} onClose={handleModalClose} dog={selectedDog}
        />
      )}
    </Container>
  )
}
export default DogsList;
