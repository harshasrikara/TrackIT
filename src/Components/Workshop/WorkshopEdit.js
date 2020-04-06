import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

/**
 * Opens up a dialog modal for the workshop data to be edited or a new workshop informatin to be added
 * Pretty important because this is where all the crud operations take place for a given workshop
 * The same dialog will be used for both when a new workshop needs to be added and for when a workshop needs to be edited
 * Intially the state is set to null and only gets updated when the textFields are changed
 * If a workshop is being edited then that workshop information is passed in as props
 *
 * Author: Harsha Srikara
 * Date: 4/6/20
 */
class WorkshopEdit extends React.Component {
  constructor(props) {
    super(props);

    // all set to null just for readability to see which fields will get filled out
    this.state = {
      Workshop: {
        Workshop_ID: null,
        Workshop_Name: null,
        Level_Titles: [null],
        Level_Descriptions: [null],
        Number_Of_Levels: 1,
        Day: null,
        Date: null,
        Month: null,
        Year: null
      }
    };
    this.initializeState = this.initializeState.bind(this);
    this.cancel = this.cancel.bind(this);
    this.submit = this.submit.bind(this);
    this.incrementLevel = this.incrementLevel.bind(this);
    this.decrementLevel = this.decrementLevel.bind(this);
    this.setWorkshopName = this.setWorkshopName.bind(this);
    this.setWorkshopLevelName = this.setWorkshopLevelName.bind(this);
    this.setWorkshopLevelDescription = this.setWorkshopLevelDescription.bind(
      this
    );
  }

  /**
   * Does not actually get called, the props are directly fed into the textFields
   */
  initializeState() {
    //if it is null then a new workshop is being created else an existing  one is being updated
    if (this.props.workshop != null) {
      this.setState({
        Workshop: this.props.workshop
      });
    }
  }

  /**
   * This gets called when someone clicks cancel or outside the dialog box
   * Returns an empty workshop object and false for whether the submit button was pressed
   */
  cancel() {
    this.setState({
      Workshop: {
        Workshop_ID: null,
        Workshop_Name: null,
        Level_Titles: [null],
        Level_Descriptions: [null],
        Number_Of_Levels: 1,
        Day: null,
        Date: null,
        Month: null,
        Year: null
      }
    });
    this.props.submit(this.state.Workshop, false);
  }

  /**
   * This gets called when the submit button is pressed to save changes made to a workshop or save a new workshop
   */
  submit() {
    let lvlTitl = this.state.Workshop.Level_Titles.slice(
      0,
      this.state.Workshop.Number_Of_Levels
    );
    let lvlDesc = this.state.Workshop.Level_Descriptions.slice(
      0,
      this.state.Workshop.Number_Of_Levels
    );
    this.setState(state => ({
      Workshop: {
        ...state.Workshop,
        Level_Titles: lvlTitl,
        Level_Descriptions: lvlDesc
      }
    }));
    this.props.submit(this.state.Workshop, true);
    this.setState({
      Workshop: {
        Workshop_ID: null,
        Workshop_Name: null,
        Level_Titles: [null],
        Level_Descriptions: [null],
        Number_Of_Levels: 1,
        Day: null,
        Date: null,
        Month: null,
        Year: null
      }
    });
    
  }

  incrementLevel() {
    let workshop = this.state.Workshop;
    workshop.Number_Of_Levels = workshop.Number_Of_Levels + 1;
    this.setState({ Workshop: workshop });
  }

  decrementLevel() {
    let workshop = this.state.Workshop;
    workshop.Number_Of_Levels = workshop.Number_Of_Levels - 1;
    this.setState({ Workshop: workshop });
  }

  /**
   * Event handler for workshop name, note: workshop name is a primary key and changing it is not allowed if a workshop has already been created
   * @param {*} event
   */
  setWorkshopName(event) {
    let temp = event.target.value;
    this.setState(state => ({
      Workshop: {
        ...state.Workshop,
        Workshop_ID: temp,
        Workshop_Name: temp
      }
    }));
  }

  /**
   * Event handler for the level name, was tricky using the same event handler for all level names but it works like a charm
   * @param {*} event
   */
  setWorkshopLevelName(event) {
    let temp = event.target.id;
    let tempArray = this.state.Workshop.Level_Titles;
    for (var i = 0; i < this.state.Workshop.Number_Of_Levels; i++) {
      if (temp === i + "") {
        tempArray[i] = event.target.value;
      }
    }

    this.setState(state => ({
      Workshop: {
        ...state.Workshop,
        Level_Titles: tempArray
      }
    }));
    console.log(this.state.Workshop.Level_Titles);
  }

  /**
   * Event handler for the level description
   * @param {*} event
   */
  setWorkshopLevelDescription(event) {
    let temp = event.target.id;
    let tempArray = this.state.Workshop.Level_Descriptions;
    for (var i = 0; i < this.state.Workshop.Number_Of_Levels; i++) {
      if (temp === i + "-level") {
        tempArray[i] = event.target.value;
      }
    }

    this.setState(state => ({
      Workshop: {
        ...state.Workshop,
        Level_Descriptions: tempArray
      }
    }));
    console.log(this.state.Workshop.Level_Descriptions);
  }

  render() {
    //the following code generates the appropriate number of textFields to be filled in based on Number_Of_Levels
    //level text fields have the id set to 0,1,2,3... etc which is used by the event handler to decide what to modify
    //level description fields have the id set to 0-level,1-level,2-level... etc which is used by the event handler
    let lvlTitl = [];
    let lvlDesc = [];
    for (var i = 0; i < this.state.Workshop.Number_Of_Levels; i++) {
      lvlTitl.push(i + "");
      lvlDesc.push(i + "-level");
    }
    let lvlTitleFields = lvlTitl.map((item, i) => (
      <DialogContent>
        <form>
          <TextField
            required
            id={item}
            label="Level Name"
            helperText="Enter Level Name"
            placeholder="Level Name"
            className="mr-5"
            onChange={this.setWorkshopLevelName}
            value={this.state.Workshop.Level_Titles[i] || ""}
          />
          <TextField
            id={lvlDesc[i]}
            label="Level Description"
            multiline
            rowsMax="4"
            helperText="Enter Description of Level"
            placeholder="Level Description"
            className="mr-5"
            onChange={this.setWorkshopLevelDescription}
            value={this.state.Workshop.Level_Descriptions[i] || ""}
          />
        </form>
      </DialogContent>
    ));

    return (
      <div>
        <Dialog
          open={this.props.isOpen}
          onClose={this.cancel}
          onEnter={this.initializeState}
          maxWidth="xl"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.props.titleText}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.messageText}
            </DialogContentText>
          </DialogContent>
          <DialogContent>
            <form>
              <TextField
                required
                id="workshop-title"
                label="Workshop Title"
                helperText="Enter title of Workshop"
                placeholder="Workshop Name"
                className="mr-5"
                onChange={this.setWorkshopName}
                value={this.state.Workshop.Workshop_Name || ""}
                disabled={!this.props.newWorkshop}
              />
              {"Workshop Levels: " + this.state.Workshop.Number_Of_Levels}
              <Fab color="primary" aria-label="remove" className="ml-5 mr-2">
                <RemoveIcon onClick={this.decrementLevel} />
              </Fab>
              <Fab color="primary" aria-label="add" className="ml-2 mr-2">
                <AddIcon onClick={this.incrementLevel} />
              </Fab>
            </form>
          </DialogContent>
          {/* Dynamically add in required number of text fields based on the number of levels */}

          {lvlTitleFields}

          <DialogActions>
            <Button onClick={this.cancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submit} color="secondary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default WorkshopEdit;