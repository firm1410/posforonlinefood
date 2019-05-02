import React, { Component } from "react";
class SetPin extends Component {
  constructor() {
    super();
    this.state = {
      pin: [],
      enterCode: "",
      fields: "fields",
      titletxt: <strong>Please enter the correct PIN-Code.</strong>,
      number: "grid__col grid__col--1-of-3",
      numberfield: [
        "grid__col grid__col--1-of-4 numberfield",
        "grid__col grid__col--1-of-4 numberfield",
        "grid__col grid__col--1-of-4 numberfield",
        "grid__col grid__col--1-of-4 numberfield"
      ],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNumnerField = this.handleNumnerField.bind(this);
  }
  componentDidMount(){
    if(this.props.stat=="available"){
      this.setState({titletxt:<strong>กรุณากำหนดรหัสผ่าน</strong>});
    }else if(this.props.stat=="customer"){
      this.setState({titletxt:<strong>กรุณาพิมรหัสผ่านที่คนแรกกำหนดไว้</strong>});
    }
  }
  
  handleDelete() {
    this.setState({
      enterCode: this.state.enterCode.substring(
        0,
        this.state.enterCode.length - 1
      )
    });
    console.log(this.state.enterCode);
    this.state.numberfield[parseInt(this.state.enterCode.length - 1)] =
      "grid__col grid__col--1-of-4 numberfield ";
  }
  handleNumnerField(num) {
    let code = this.state.enterCode + num.toString();
    console.log(code);
    this.setState({ enterCode: code });
    let lengthCode = parseInt(code.length);
    lengthCode--;
    this.state.numberfield[lengthCode] =
      "grid__col grid__col--1-of-4 numberfield active";
    if (lengthCode == 3) {
      // Check the PIN
      if(this.props.stat =="available"){
        console.log(this.props.number);
        console.log(this.props.stat);
        fetch(
          "http://localhost:3010/tab/add?no=" +
            this.props.number +
            '&status="customer"&pin=' +
            code
        ).catch(err => console.error(err));
        this.setState({
          numberfield: [
            "grid__col grid__col--1-of-4 numberfield active right",
            "grid__col grid__col--1-of-4 numberfield active right",
            "grid__col grid__col--1-of-4 numberfield active right",
            "grid__col grid__col--1-of-4 numberfield active right"
          ]
        });
        this.state.number = "grid__col grid__col--1-of-3 hide";
        this.state.titletxt = <strong>กำหนดรหัสผ่านสำเร็จ</strong>;
        this.props.page();

      }else if (code == this.props.pin) {
        // Right PIN!

        this.setState({
          numberfield: [
            "grid__col grid__col--1-of-4 numberfield active right",
            "grid__col grid__col--1-of-4 numberfield active right",
            "grid__col grid__col--1-of-4 numberfield active right",
            "grid__col grid__col--1-of-4 numberfield active right"
          ]
        });
        this.state.number = "grid__col grid__col--1-of-3 hide";
        this.state.titletxt = <strong>รหัสผ่านถูกต้อง</strong>;
        this.props.page();
      } else {
        // Wrong PIN!
        this.state.fields = "fields miss";
        code = "";
        this.setState({ enterCode: "" });
        setTimeout(() => {
          this.setState({
            numberfield: [
              "grid__col grid__col--1-of-4 numberfield",
              "grid__col grid__col--1-of-4 numberfield",
              "grid__col grid__col--1-of-4 numberfield",
              "grid__col grid__col--1-of-4 numberfield"
            ]
          });
        }, 200);
        setTimeout(() => {
          this.state.fields = "fields";
        }, 500);
      }
    
      
    }
  }

  render() {
    let numberfield = this.state.numberfield;
    let field = this.state.fields;
    let titletxt = this.state.titletxt;
    let number = this.state.number;
    return (
      <div className="pincode">
        <div className="table">
          <div className="cell">
            <div className="title">{titletxt}</div>

            <div className={field}>
              <div className="grid">
                <div className={numberfield[0]}>
                  <span />
                </div>
                <div className={numberfield[1]}>
                  <span />
                </div>
                <div className={numberfield[2]}>
                  <span />
                </div>
                <div className={numberfield[3]}>
                  <span />
                </div>
              </div>
            </div>

            <div className="numbers">
              <div className="grid">
                <div
                  className={number}
                  onClick={this.handleNumnerField.bind(this, "1")}
                >
                  <button>1</button>
                </div>
                <div
                  className={number}
                  onClick={this.handleNumnerField.bind(this, "2")}
                >
                  <button>2</button>
                </div>
                <div
                  className={number}
                  onClick={this.handleNumnerField.bind(this, "3")}
                >
                  <button>3</button>
                </div>

                <div
                  className={number}
                  onClick={this.handleNumnerField.bind(this, "4")}
                >
                  <button>4</button>
                </div>
                <div
                  className={number}
                  onClick={this.handleNumnerField.bind(this, "5")}
                >
                  <button>5</button>
                </div>
                <div
                  className={number}
                  onClick={this.handleNumnerField.bind(this, "6")}
                >
                  <button>6</button>
                </div>

                <div
                  className={number}
                  onClick={this.handleNumnerField.bind(this, "7")}
                >
                  <button>7</button>
                </div>
                <div
                  className={number}
                  onClick={this.handleNumnerField.bind(this, "8")}
                >
                  <button>8</button>
                </div>
                <div
                  className={number}
                  onClick={this.handleNumnerField.bind(this, "9")}
                >
                  <button>9</button>
                </div>

                <div className={number}>
                  <button />
                </div>
                <div
                  className={number}
                  onClick={this.handleNumnerField.bind(this, "0")}
                >
                  <button>0</button>
                </div>
                <div className={number} onClick={this.handleDelete.bind(this)}>
                  <button>X</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SetPin;
