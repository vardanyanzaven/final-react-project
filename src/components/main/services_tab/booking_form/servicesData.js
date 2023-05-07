export const SERVICE_DATA = (f) => {
  const serviceData = [
    {
      url: "https://cdn.pixabay.com/photo/2014/11/13/17/04/heart-529607_960_720.jpg",
      name: "wedding",
      car: "Mercedes",
      title: `A wedding is one of the most special days in anyone's life, and many couples want every detail 
            to be perfect. One detail that can really make a difference on this special day is the wedding car serv
            ice. Choosing the right car service can add a touch of elegance and luxury to the event and make the br
            ide and groom feel like royalty.`,
    },
    {
      url: "https://img.traveltriangle.com/blog/wp-content/uploads/2018/09/hong-kong-casinos-cover.jpg",
      name: "casino",
      title: `A casino is a facility where people can participate in gambling activities such as slot machines, 
            table games, and sports betting. Casinos are usually found in popular tourist destinations and major cities a
            round the world, and they offer a variety of entertainment options in addition to gambling.`,
    },
    {
      url: "https://www.empirelimousine.net/wp-content/uploads/2017/07/Empire_limousine_1.jpg",
      name: "airport",
      car: "BMW",
      title: `
          Airports are important transportation hubs that connect people and
          goods to destinations all over the world. They provide a variety of
          services, including check-in and baggage handling, security screening,
          and various retail and dining options for travelers.
        `,
    },
    {
      url: "https://sevenrooms.com/wp-content/uploads/2022/06/nightclub-girls-768x512.jpg",
      name: "night-club",
      car: "Lexus",
      title: `
              If you're looking to throw a memorable party, there's no better way to make a statement than by 
              renting a limousine from our service. Our sleek and luxurious limousines provide the perfect backdrop for any 
              celebration, whether it's a birthday, prom, bachelor/bachelorette party, or even a night out on the town.
      `,
    },
    {
      url: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/08/14/16/istock-945885714.jpg?width=1200",
      name: "happy-birthday",
      title: `
            Happy Birthday! I hope this day is filled with joy, laughter, and all the things that make you happy. May this new 
            year of your life bring you exciting adventures, personal growth, and new opportunities to fulfill your dreams. Enjoy
             your special day and make unforgettable memories that you will cherish for years to come!
      `,
    },
    {
      url: "https://www.bhg.com/thmb/asoM6Zj_sJvoXqq3sGUIoMwzmec=/1983x0/filters:no_upscale():strip_icc()/Obsessed-with-picnicking-2-02de801d4e8d443280c30c1ec3e93453.jpg",
      name: "out-of-city",
      title: `
      Spending time in nature can be a wonderful way to relax and recharge. Whether you're taking a hike through the mountains,
       strolling through a peaceful forest, or simply
       sitting by a tranquil lake, being surrounded by natural beauty can help calm your mind and reduce stress.
      `,
    },
  ];

  if (f) return serviceData.filter((s) => s.name === f);
  return serviceData;
};
