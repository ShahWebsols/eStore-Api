import React from "react";

function ContentHeader({ title }) {
  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>{title}</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb justify-content-end">
              <li className="breadcrumb-item">
                <a href="!#">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {title}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentHeader;
