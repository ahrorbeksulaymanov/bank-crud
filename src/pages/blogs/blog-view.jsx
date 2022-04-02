import React from "react";
import { useHistory } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import product2 from "../../assets/images/main-r1.jpg";
const BlogsView = () => {
    const history = useHistory();
    return (
      <div className="conpany-page">
        <p className="d-flex justify-content-between align-items-center fw-600 mt-4">
          <div
            onClick={() => history.goBack()}
            className="d-flex align-items-center fw-600 back-button pointer"
          >
            <IoIosArrowBack /> Back
          </div>
          <h4 className="conpany_header_name">bottage veneta</h4>
          <div></div>
        </p>
        <div className="row">
          <div className="col-md-7">
              <img src={product2} className='w-100 mb-5' alt="" />
          </div>
          <div className="col-md-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis culpa facilis eum dolore? Saepe dignissimos vero quasi, facilis itaque commodi quisquam nulla minima, reiciendis error corrupti deleniti aut distinctio veritatis nobis odio iste corporis iusto laboriosam repellendus. Ullam rem, veniam quo doloribus adipisci nisi itaque vitae, suscipit, placeat sit corrupti!</div>
      </div>
      </div>
    );
};
export default BlogsView;
