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
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzDFBTzsdqyKeyGA0f8yvhPF0V1wo15_E39w&usqp=CAU",
      name: "casino",
      title: `A casino is a facility where people can participate in gambling activities such as slot machines, t
            able games, and sports betting. Casinos are usually found in popular tourist destinations and major cities a
            round the world, and they offer a variety of entertainment options in addition to gambling.`,
    },
    {
      url: "https://cdn.pixabay.com/photo/2014/11/13/17/04/heart-529607_960_720.jpg",
      name: "airport",
      car: "BMW",
    },
    {
      url: "https://cdn.pixabay.com/photo/2014/11/13/17/04/heart-529607_960_720.jpg",
      name: "baptizm",
      car: "Lexus",
    },
    {
      url: "https://cdn.pixabay.com/photo/2014/11/13/17/04/heart-529607_960_720.jpg",
      name: "bappy-birthday",
    },
    {
      url: "https://cdn.pixabay.com/photo/2014/11/13/17/04/heart-529607_960_720.jpg",
      name: "out-of-city",
    },
  ];

  if (f) return serviceData.filter((s) => s.name === f);
  return serviceData;
};
