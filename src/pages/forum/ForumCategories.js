import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ForumCatogories.css";
import { getForumCats } from './../../services/forumcategories';
/* const forums_categories = [
  {
    _id: "10eba340-nfjc-11eb-b8bc-0242ac130003",
    title: "Allergies",
    details: "Operations and surgical procedures",
    icon: "fas fa-cut fa-1x",
  },
  {
    _id: "36eb5176-bdhc-11eb-b8bc-0242ac130003",
    title: "Bones, Joint, Muscles",
    details: "Bones, joints and muscles",
    icon: "fas fa-bone fa-1x",
  },
  {
    _id: "3f9e633a-d01c-3bgd-b8bc-0242ac130003",
    title: "Duis aute irure dolor",
    details: "Brain and nerves",
    icon: "fas fa-eye fa-1x",
  },
  {
    _id: "3f9e633a-d01c-11eb-b8bc-0242anh3v003",
    title: "Duis aute irure dolor",
    details: "Brain and nerves",
    icon: "fas fa-heart fa-1x",
  },
  {
    _id: "3f9e633a-d01c-11j3-b8bc-0242ac130003",
    title: "Irure uis aute dolor",
    details: "Brain and nerves",
    icon: "fas fa-wine-glass-alt fa-1x",
  },
  {
    _id: "3f9e633a-d01c-11eb-b8bc-0242ac133923",
    title: "Duis aute irure dolor",
    details: "Brain and nerves",
    icon: "fas fa-bacterium fa-1x",
  },
  {
    _id: "36eb5176-d01c-11eb-b8bc-0242ac174003",
    title: "Ea commodo consequat",
    details: "Bones, joints and muscles",
    icon: "fas fa-bone fa-1x",
  },
  {
    _id: "36eb5176-d0we-11eb-b8bc-0242ac130003",
    title: "Ea commodo consequat",
    details: "Bones, joints and muscles",
    icon: "fas fa-bone fa-1x",
  },
  {
    _id: "3f9hfb3a-d01c-11eb-b8bc-0242ac130003",
    title: "Duis aute irure dolor",
    details: "Brain and nerves",
    icon: "fas fa-eye fa-1x",
  },
  {
    _id: "3f9e633a-d01c-1vfd-b8bc-0242ac130003",
    title: "Duis aute irure dolor",
    details: "Brain and nerves",
    icon: "fas fa-eye fa-1x",
  },
  {
    _id: "3f9e633a-d01c-11eb-b8bc-0234dc130003",
    title: "Duis aute irure dolor",
    details: "Brain and nerves",
    icon: "fas fa-eye fa-1x",
  },
  {
    _id: "36eb5176-d01c-11eb-bdf-0242ac130003",
    title: "Ea commodo consequat",
    details: "Bones, joints and muscles",
    icon: "fas fa-bone fa-1x",
  },
  {
    _id: "36eb5176-d01c-11eb-b8bc-0242fr130003",
    title: "Ea commodo consequat",
    details: "Bones, joints and muscles",
    icon: "fas fa-bone fa-1x",
  },
  {
    _id: "36eb5176-d01c-11eb-b8bc-0242ac130024",
    title: "Featured Forum",
    details: "Bones, joints and muscles",
    icon: "fas fa-bone fa-1x",
  },
]; */

const ForumCategories = (props) => {

  const [forumcats, setForumcats] = useState([]);

  const getforumCats = async()=>{
    const {data:forumCats} = await getForumCats();
    setForumcats(forumCats);
  }

  useEffect(function () {
    getforumCats();
  }, []);


  return (
    <>
      <h3 className="mb-2">Forum Categories</h3>
      <ul class="list-group">
        <div class="row for-cat-row">
          {forumcats.map((el) => (
            <li class="list-group-item col-12 col-md-5 mr-2 for-cat-list">
              <i class={`${el.icon} mr-2`}></i>{" "}
              <Link
                // onClick={() => props.updateForumCatName(el.title)}
                to={{ pathname: `/categories/${el._id}`, state: `${el.name}` }}
              >
                {el.title}
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </>
  );
};

export default ForumCategories;
