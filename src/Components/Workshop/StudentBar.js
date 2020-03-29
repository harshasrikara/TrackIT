import React from "react";
import Nav from "react-bootstrap/Nav";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



/**
 * The is a Student bar that shows detailed information about a student. It shows their name, their progress in the workshop and an option to see if they have submitted an alert and to download their information
 *
 * Author: Harsha Srikara
 * Date: 3/28/20
 */
class StudentBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {

        //makes the data dynamic by calculating how much is complete, how much is being worked on and how much is left to be finished
        //probably extract this into a function and just load 3 values into render in the future
        let maxProgress = this.props.TotalProgress;
        let percentWorkingProgress = 1/maxProgress * 100;
        let currentProgress = this.props.Progress;
        let percentCurrentProgress = currentProgress/maxProgress * 100;
        if(currentProgress===maxProgress) {
            percentWorkingProgress = 0;
        }
        let percentIncompleteProgress = 100 - percentCurrentProgress - percentWorkingProgress;

        return (
          <div>
            <div className="m-3 mt-5 p-4 floating-icon">
              <Nav justify>
                <Nav.Item>
                  <h1>{this.props.Student_Name}</h1>
                </Nav.Item>
                {/* This needs to eventually be dynamic and use inforamtion passed in as props to render the actual proportions instead of hardcoded values */}
                <Nav.Item className="mt-3">
                  <ProgressBar>
                    <ProgressBar
                      striped
                      variant="success"
                      animated
                      now={percentCurrentProgress}
                      key={1}
                    />
                    <ProgressBar
                      striped
                      variant="warning"
                      animated
                      now={percentWorkingProgress}
                      key={2}
                    />
                    <ProgressBar
                      striped
                      variant="danger"
                      animated
                      now={percentIncompleteProgress}
                      key={3}
                    />
                  </ProgressBar>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link disabled>
                    <FontAwesomeIcon icon={faExclamationTriangle} size="lg" />
                    &nbsp;Alert
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <FontAwesomeIcon icon={faDownload} size="lg" />
                    &nbsp;Download
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
        );
      }
}

export default StudentBar;