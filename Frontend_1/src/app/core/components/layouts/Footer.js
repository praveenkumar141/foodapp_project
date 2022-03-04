import React from "react";
import { connect } from "react-redux";

export const Footer = () => {
  return (
    <div className="text-center fixed-bottom">
      &copy; 2022 &middot; All rights reserved
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
