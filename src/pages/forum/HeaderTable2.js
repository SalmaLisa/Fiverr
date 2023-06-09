import React from "react";
import './HeaderTable2.css'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import SearchForum from "./SearchForum";
import AddIcon from '@material-ui/icons/Add';


const HeaderTable = () => {
  return (
    <div className="HeaderTables">

      <div className="HeaderTablesDiv1">
        <button className="HeaderTablesDiv1Btn1">
          <div className="textStyle">Create Topic</div>
          <AddIcon />
        </button>

        <button className="HeaderTablesDiv1Btn">
          <div className="textStyle">All Categories</div>
          <ArrowRightIcon />
        </button>

        <button className="HeaderTablesDiv1Btn">
          <div className="textStyle">All Topics</div>
          <ArrowRightIcon />
        </button>
      </div>

      <div className="HeaderTablesDiv2">
        <div className="HeaderTablesDiv2Text">
          Recent
        </div>

        <div className="HeaderTablesDiv2Text">
          Top
        </div>

        <div className="HeaderTablesDiv2Btn">
          <div className="catText">
            Categories
          </div>
        </div>

        <div className="HeaderTablesDiv2Text">
          Docs
        </div>
      </div>

      <div className="HeaderTablesDiv3">
        <SearchForum />
      </div>

    </div>

  );
};

export default HeaderTable;
