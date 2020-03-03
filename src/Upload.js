import React from 'react';
import {Form, InputGroup, FormGroup, Button} from 'react-bootstrap';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 15px;
  margin: auto;
  height: 100%;

`

export const Upload =() =>(
    <Container>
    <Form>
        <InputGroup>
        <div className="custom-file">
            <input type="file" class="custom-file-input" id="customFile"/>
            <label class="custom-file-label" for="customFile">Choose file</label>
        </div>
        </InputGroup>
        <FormGroup>
            <Form.Label>Title:</Form.Label>
            <Form.Control plaintext placeholder="Video Title"/>
        </FormGroup>
        <FormGroup>
            <Form.Label>Description:</Form.Label>
            <Form.Control as="textarea" placeholder="optional"/>
        </FormGroup>
        <Button variant="danger" type="submit" size="lg" block>
            Upload
        </Button>
    </Form>
    </Container>
    
)