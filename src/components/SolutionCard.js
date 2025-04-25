import React, { useEffect } from "react";
import "../css/style.css";
import AOS from "aos";
import "aos/dist/aos.css";
import img1 from "../assets/img/img5.jpg";
import img2 from "../assets/img/img6.jpg";
import img3 from "../assets/img/img7.jpg";
const Card = React.memo(({ item, ...props }) => {
  return (
    <article key={item.id} {...props}>
      <div className="article-wrapper">
        <figure>
          <img src={item.image} alt={item.Title} loading="lazy" />
        </figure>
        <div className="article-body">
          <h2>{item.Title}</h2>
          <h3 className="text-xl font-bold">{item.SubTitle}</h3>
          <p>{item.discription}</p>
          <a href="#" className="read-more">
            {/* Read more <span className="sr-only">about this is some title</span> */}
            {/* <svg
              xmlns="https://t3.ftcdn.net/jpg/05/85/33/24/360_F_585332472_NXIwwkCBvdqr7HDnLxFFQpuxWr6BxuEE.jpg"
              className="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg> */}
          </a>
        </div>
      </div>
    </article>
  );
});

const SolutionCard = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
    });

    // Ensure AOS is refreshed after the component renders
    AOS.refresh();
  }, []);

  const data = [
    {
      id: 0,
      Title: "Trading Basics",
      SubTitle: "KEY FEATURES",
      discription:
        "Trading involves buying and selling assets like stocks, bonds,and commodities.",
      image: img1,
    },
    {
      id: 1,
      Title: "Types of Trading",
      SubTitle: "KEY FEATURES",
      discription:
        "There are various types of trading, such as day trading, swing trading, and long-term investing.",
      image: img2,
    },
    {
      id: 2,
      Title: "Market Analysis",
      SubTitle: "KEY FEATURES",
      discription:
        " Successful trading requires understanding market trends and using tools like technical analysis.",
      image: img3,
    },
  ];

  return (
    <div className="min-h-screen w-full mt-10">
      <h1 className="text-center text-3xl md:text-4xl mb-8 font-semibold">
        Let's Dive into Trading world
      </h1>
      <div>
        <section className="articles lg:grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-20">
          {data.map((item, index) => (
            <Card
              key={item.id}
              item={item}
              data-aos="fade-up"
              data-aos-duration={index * 1000}
              data-aos-delay={index * 200}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default SolutionCard;
