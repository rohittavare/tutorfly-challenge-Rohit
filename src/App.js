import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//constants used to identify the computation being done
const ADD = 1;
const SUB = 2;
const MULT = 3;
const DIV = 4;

//the four basic functions (/*+-) all require two inputs. These variables keep track of those inputs
var num1 = 0;
var num2 = 0;

//The calculator displays one number at a time; this boolean determines which one is displayed
var numOneVisible = true;

//This variable uses the constants to determine which arithmetic function to do
var calculationType = 0;

//the functionality for the entire calculator app
class App extends Component {

  //renders out the number display, and the buttons
  render() {
    return(
      <div className="calculator">
        <div className="row">
          <Display />
        </div>
        <div className="row">
          {this.renderButton("7")}
          {this.renderButton("8")}
          {this.renderButton("9")}
          <MathButton
            value="*"
            mathFunction={(e) => this.setCalculationType(e)}
            type={MULT}
          />
        </div>
        <div className="row">
          {this.renderButton("4")}
          {this.renderButton("5")}
          {this.renderButton("6")}
          <MathButton
            value="/"
            mathFunction={(e) => this.setCalculationType(e)}
            type={DIV}
          />
        </div>
        <div className="row">
          {this.renderButton("1")}
          {this.renderButton("2")}
          {this.renderButton("3")}
          <MathButton
            value="-"
            mathFunction={(e) => this.setCalculationType(e)}
            type={SUB}
          />
        </div>
        <div className="row">
          <MathButton
            value="c"
            mathFunction={() => this.clear()}
          />
          {this.renderButton("0")}
          <MathButton
            value="="
            mathFunction={() => this.calculate()}
          />
          <MathButton
            value="+"
            mathFunction={(e) => this.setCalculationType(e)}
            type={ADD}
          />
        </div>
      </div>
    );
  }

  //appends the number passed into the function to whichever number is currently visible
  //function is declared here to allow force update of whole app when a number is appended
  addToNum(num) {
    if(numOneVisible) {
      num1 = num1 * 10 + parseInt(num);
    } else {
      num2 = num2 * 10 + parseInt(num);
    }
    this.forceUpdate();
  }

  //clears the variables and arithmetic computations
  //function is declared here to allow force update of whole app when a number is appended
  clear() {
    num1 = 0;
    num2 = 0;
    numOneVisible = true;
    calculationType = 0;
    this.forceUpdate();
  }

  //sets the computation to be multiplication, addition, etc. based on the variable passed in
  //Function is needed because the computation sign is often followed by a number, so the kind of computation needs to be saved in memory
  setCalculationType(type) {
    calculationType = type;
    if(numOneVisible) {
      numOneVisible = false;
    } else {
      //since only two numbers are stored at a time, the prior calculation must be done to clear up a variable
      this.calculate();
      numOneVisible = true;
    }
  }

  //calculates the value based on the num1 and num2 and calculationType
  calculate() {
    if(calculationType != 0) {
      if(calculationType == ADD) {
        num1 = num2 + num1;
        num2 = 0;
        numOneVisible = true;
      } else if(calculationType == SUB) {
        num1 = num1 - num2;
        num2 = 0;
        numOneVisible = true;
      } else if(calculationType == MULT) {
        num1 = num1 * num2;
        num2 = 0;
        numOneVisible = true;
      }  else if(calculationType == DIV) {
        if(num2 != 0) {
          num1 = num1 / num2;
          num2 = 0;
          numOneVisible = true;
        }
      }
      this.forceUpdate();
    }
  }

  //condense the code in render() function due to large number of buttons
  renderButton(i) {
    return(
      <NumberButton
        value={i}
        appendNum={(e) => this.addToNum(e)}
      />
    );
  }

}

//buttons specifically to append a number to the display
class NumberButton extends Component {
  render() {
    return (
      <div className="Button" onClick={() => this.props.appendNum(this.props.value)}>
        <div className="Button-Val">{this.props.value}</div>
      </div>
    );
  }
}

//buttons specifically to indicate the computation type
class MathButton extends Component {
  render() {
    return (
      <div className="Button" onClick={() => this.props.mathFunction(this.props.type)}>
        <div className="Button-Val">{this.props.value}</div>
      </div>
    );
  }
}

//display for the numbers
class Display extends Component {
  render() {
    if(numOneVisible) {
      return(
        <div className="Num-Display">
          {num1}
        </div>
      );
    } else {
      return(
        <div className="Num-Display">
          {num2}
        </div>
      );
    }
  }
}

export default App;
