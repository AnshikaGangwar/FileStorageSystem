import { Table, Grid, Button, Form } from "react-bootstrap";
import React, { Component } from "react";
//import logo from './logo.svg';
import "./App.css";
import web3 from "./web3";
import ipfs from "./ipfs";
import storehash from "./storehash";

class App extends Component {
  state = {
    ipfsHash: null,
    buffer: "",
    ethAddress: "",
    blockNumber: "",
    transactionHash: "",
    gasUsed: "",
    txReceipt: "",
    images: [],
  };

  captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };

  convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    this.setState({ buffer });
  };

  onClick = async () => {
    try {
      this.setState({ blockNumber: "waiting.." });
      this.setState({ gasUsed: "waiting..." });

      await web3.eth.getTransactionReceipt(
        this.state.transactionHash,
        (err, txReceipt) => {
          console.log(err, txReceipt);
          this.setState({ txReceipt });
        }
      );

      await this.setState({ blockNumber: this.state.txReceipt.blockNumber });
      await this.setState({ gasUsed: this.state.txReceipt.gasUsed });
    } catch (error) {
      console.log(error);
    }
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    console.log("Sending from Metamask account: " + accounts[0]);

    const ethAddress = await storehash.options.address;
    this.setState({ ethAddress });
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      this.setState({ ipfsHash: ipfsHash[0].hash });

      storehash.methods.sendHash(this.state.ipfsHash).send(
        {
          from: accounts[0],
        },
        (error, transactionHash) => {
          console.log(transactionHash);
          console.log(this.state.ipfsHash);
          this.setState({ transactionHash });
        }
      );
    });
  };

  onClear = () => {
    this.setState({
      ipfsHash: null,
      buffer: "",
      ethAddress: "",
      blockNumber: "",
      transactionHash: "",
      gasUsed: "",
      txReceipt: "",
      images: [],
    });
  };

  fetchImage = async (event) => {
    const hashAddress = await storehash.methods.getHash().call();
    console.log(hashAddress);
    this.setState({ images: hashAddress });
    //window.open("https://ipfs.io/ipfs/"+hashAddress);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> File Storage using IPFS and Ethereum</h1>
        </header>

        <hr />

        <Grid>
          <h3> Choose file to send to IPFS </h3>
          <Form onSubmit={this.onSubmit}>
            <input type="file" onChange={this.captureFile} />
            <Button bsStyle="primary" type="submit">
              Send it
            </Button>
          </Form>

          <hr />
          <Button onClick={this.onClick}> Get Transaction Receipt </Button>
          <Button onClick={this.onClear}> Clear </Button>
          <br />
          <Button onClick={this.fetchImage}> Get Images </Button>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Tx Receipt Category</th>
                <th>Values</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>IPFS Hash # stored on Eth Smart Contract</td>
                <td>{this.state.ipfsHash}</td>
              </tr>
              <tr>
                <td>Ethereum Smart Contract Address</td>
                <td>{this.state.ethAddress}</td>
              </tr>

              <tr>
                <td>Tx Hash # </td>
                <td>{this.state.transactionHash}</td>
              </tr>

              <tr>
                <td>Block Number # </td>
                <td>{this.state.blockNumber}</td>
              </tr>

              <tr>
                <td>Gas Used</td>
                <td>{this.state.gasUsed}</td>
              </tr>
            </tbody>
          </Table>
        </Grid>
        <div>
          <h3>Images</h3>
          {this.state.images.map((image, idx) => (
            <Button style={{margin:"5px"}} onClick={()=>window.open("https://ipfs.io/ipfs/"+image)}>
              <li>Image {idx}</li>
            </Button>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
