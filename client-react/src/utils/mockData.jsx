// Mock data for bookings
export const mockBookings = [
    {
      bookingId: "BOOKING-4a3d9cb7-b0c5-4f07-8099-a3d1268e60d8",
      dateBooking: "2025-04-05T10:00:00.000Z",
      returnDate: "2025-04-10T18:00:00.000Z",
      priceBooking: 150,
      bookingStatus: "Confirmed",
      addressTake: "123 Main Street, Downtown, City",
      client: "user123", // This would normally be an ObjectId
      car: {
        _id: "car1",
        make: "Ford",
        model: "Focus",
        year: 2023,
        type: "Sedan",
        fuelType: "Gas-V",
        transmission: "Manual",
        mileage: 400,
        imageUrl: "https://th.bing.com/th/id/R.7317462d09d933c7c41e2a9b22e132cb?rik=8LBFatxZ6BGKDw&riu=http%3a%2f%2fronnielogues.com%2fwp-content%2fuploads%2f2014%2f03%2flamarque-ford-2015-ford-focus.jpg&ehk=YnDFVMC8DVN3Yt5Y%2fl1RDDyIyERUdA2LWfqzZRQB6yI%3d&risl=&pid=ImgRaw&r=0"
      },
      paymentDetails: "payment123" // This would normally be an ObjectId
    },
    {
      bookingId: "BOOKING-7e5f2a1b-c8d9-4e3f-b2a1-6c7d8e9f0a1b",
      dateBooking: "2025-03-20T09:30:00.000Z",
      returnDate: "2025-03-23T17:00:00.000Z",
      priceBooking: 105,
      bookingStatus: "Completed",
      addressTake: "456 Park Avenue, Midtown, City",
      client: "user123", // This would normally be an ObjectId
      car: {
        _id: "car2",
        make: "Toyota",
        model: "Corolla",
        year: 2024,
        type: "Sedan",
        fuelType: "Gas-V",
        transmission: "Manual",
        mileage: 400,
        imageUrl: "https://autotest.com.ar/wp-content/uploads/2023/09/Toyota-Corolla-2024-trompa-1.jpg"
      },
      paymentDetails: "payment456" // This would normally be an ObjectId
    },
    {
      bookingId: "BOOKING-9c8b7a6d-5e4f-3c2b-1a0d-9e8f7c6b5a4d",
      dateBooking: "2025-04-15T11:00:00.000Z",
      returnDate: "2025-04-18T16:00:00.000Z",
      priceBooking: 175,
      bookingStatus: "Pending",
      addressTake: "789 Ocean Drive, Beachside, City",
      client: "user123", // This would normally be an ObjectId
      car: {
        _id: "car3",
        make: "Honda",
        model: "Civic",
        year: 2023,
        type: "Sedan",
        fuelType: "Hybrid",
        transmission: "Automatic",
        mileage: 560,
        imageUrl: "https://th.bing.com/th/id/R.12bcd019bc0da4de34f5b8663bca257c?rik=tGMZCcRLh4D%2fhg&pid=ImgRaw&r=0"
      },
      paymentDetails: "payment789" // This would normally be an ObjectId
    },
    {
      bookingId: "BOOKING-2d1e0f9c-8b7a-6d5e-4f3c-2b1a0d9e8f7c",
      dateBooking: "2025-02-10T08:30:00.000Z",
      returnDate: "2025-02-15T19:00:00.000Z",
      priceBooking: 220,
      bookingStatus: "Cancelled",
      addressTake: "101 Mountain Road, Hillside, City",
      client: "user123", // This would normally be an ObjectId
      car: {
        _id: "car4",
        make: "DONGFENG",
        model: "RCH 6 EV",
        year: 2024,
        type: "SUV",
        fuelType: "BEV",
        transmission: "Automatic",
        mileage: 451,
        imageUrl: "https://www.ev24.africa/wp-content/uploads/2025/02/DONFENG-RICH-6V.jpg"
      },
      paymentDetails: "payment101" // This would normally be an ObjectId
    },
    /*{
      bookingId: "BOOKING-6f5e4d3c-2b1a-0d9e-8f7c-6b5a4d3e2f1a",
      dateBooking: "2025-04-22T12:00:00.000Z",
      returnDate: "2025-04-25T12:00:00.000Z",
      priceBooking: 132,
      bookingStatus: "Confirmed",
      addressTake: "202 Valley View, Riverside, City",
      client: "user123", // This would normally be an ObjectId
      car: {
        _id: "car5",
        make: "Mazda",
        model: "CX-5",
        year: 2023,
        type: "SUV",
        fuelType: "Gas-V",
        transmission: "Automatic",
        mileage: 380,
        imageUrl: "https://via.placeholder.com/400x300/f1c40f/ffffff?text=Mazda+CX-5"
      },
      paymentDetails: "payment202" // This would normally be an ObjectId
    }*/
  ];

// data for cars
export const cars = [
    {
      id: 4,
      name: "Toyota Corolla 2024",
      fuelType: "Gas-V",
      transmission: "Manual",
      body:"Liftback",
      brand: "Toyota",
      model: "Corolla",
      year: 2024,
      range: 400,
      price: 30,
      branch:"Bujumbura",
      horsepower: 60,
      capacity: 63,
      doors: 5,
      images: [
        "https://autotest.com.ar/wp-content/uploads/2023/09/Toyota-Corolla-2024-trompa-1.jpg",
        "https://fotos.perfil.com/2022/06/03/toyota-corolla-1366413.jpg",
      ],
    },
    {
      id: 3,
      name: "Honda civic",
      fuelType: "Hybrid",
      body:"Liftback",
      transmission: "Automatic",
      brand: "Honda",
      model: "Civic",
      range: 560,
      year: 2022,
      price: 35,
      branch:"Bujumbura",
      horsepower: 100,
      capacity: 75,
      doors: 5,
      images: [
        "https://th.bing.com/th/id/R.12bcd019bc0da4de34f5b8663bca257c?rik=tGMZCcRLh4D%2fhg&pid=ImgRaw&r=0",
        "https://th.bing.com/th/id/OIP.3_ZXl6ANk_6yn42W6Vl9HwHaE8?rs=1&pid=ImgDetMain",
      ],
    },
    {
      id: 2,
      name: "Ford Focus",
      fuelType: "Gas-V",
      body:"Liftback",
      transmission: "Manual",
      brand: "Ford",
      model: "Focus",
      range: 400,
      year: 2021,
      price: 20,
      branch:"Gitega",
      horsepower: 23,
      capacity: 50,
      doors: 5,
      images: [
        "https://th.bing.com/th/id/R.7317462d09d933c7c41e2a9b22e132cb?rik=8LBFatxZ6BGKDw&riu=http%3a%2f%2fronnielogues.com%2fwp-content%2fuploads%2f2014%2f03%2flamarque-ford-2015-ford-focus.jpg&ehk=YnDFVMC8DVN3Yt5Y%2fl1RDDyIyERUdA2LWfqzZRQB6yI%3d&risl=&pid=ImgRaw&r=0",
        "https://stage-drupal.car.co.uk/s3fs-public/styles/original_size/public/2020-07/ford-focus-interior.jpg?VanDVsVRxF6CZLUoWiouiYFI3V7cYag3&itok=XYMeupaj",
        "https://th.bing.com/th/id/OIP.k1h5NUOhmmKUgjz97P-UjAHaFj?w=640&h=480&rs=1&pid=ImgDetMain",
      ],
    },
    {
      id: 1,
      brand: "Dongfeng",
      model: "Rich",
      name: "DONGFENG RCH 6 EV",
      body:"Pickup",
      range: 451,
      fuelType: "BEV",
      transmission: "Automatic",
      price: 44,
      year:2024,
      branch:"Bujumbura",
      horsepower: 177,
      capacity: 77,
      doors: 4,
      images: [
        "https://www.ev24.africa/wp-content/uploads/2025/02/DONFENG-RICH-6V.jpg",
        "https://obaidicarsjo.com/wp-content/uploads/2022/11/DSC03224.jpg",
        "https://www.dongfeng.ec/hubfs/Rich%20EV/RICH%206%20EV%20INTERIOR%206-min.jpg",
      ],
    },
    // Add more car objects as needed
  ];

  export const statusOptions = ['All', 'Available', 'Booked', 'Maintenance'];

//data for users
export const users = [
  { id: '800120', name: 'Cameron Williamson', email: 'cameronw@gmail.com', phone: '+201 9451285', role: 'Admin', status: 'Active', joinDate: '2022-01-02 10:42:01' },
  { id: '800123', name: 'Esther Howard', email: 'estherhoward@gmail.com', phone: '+201 9451285', role: 'Admin', status: 'Active', joinDate: '2022-01-22 10:42:01' },
  { id: '800186', name: 'Brooklyn Simmons', email: 'brooklynsims@gmail.com', phone: '+201 9451285', role: 'User', status: 'Active', joinDate: '2022-01-15 10:42:01' },
  { id: '800122', name: 'Guy Hawkins', email: 'guy.hawkins.com', phone: '+201 9451285', role: 'Admin', status: 'Active', joinDate: '2022-01-18 10:42:01' },
  { id: '800152', name: 'Jacob Jones', email: 'jacobjones.com', phone: '+201 9451285', role: 'User', status: 'Offline', joinDate: '2022-01-07 10:42:01' },
  { id: '800121', name: 'Ralph Edwards', email: 'ralphedwards@gmail.com', phone: '+201 9451285', role: 'User', status: 'Active', joinDate: '2022-01-09 10:42:01' },
  { id: '800129', name: 'Darlene Robertson', email: 'darlenerobertson@gmail.com', phone: '+201 9451285', role: 'Admin', status: 'Offline', joinDate: '2022-01-01 10:42:01' },
  { id: '800128', name: 'Jerome Bell', email: 'jeromebell@gmail.com', phone: '+201 9451285', role: 'Admin', status: 'Active', joinDate: '2022-01-31 10:42:01' },
  { id: '800125', name: 'Courtney Henry', email: 'courtneyhenry@gmail.com', phone: '+201 9451285', role: 'User', status: 'Unconfirmed', joinDate: '2022-01-11 10:42:01' }
];
///booking for admin
// Add this to your existing mockData.jsx file

export const bookings = [
  {
    id: "B12345",
    car: {
      name: "Toyota Camry",
      images: [
        "https://www.motortrend.com/uploads/sites/10/2017/11/2016-toyota-camry-se-sedan-angular-front.png",
        "https://i.pinimg.com/originals/d6/67/9c/d6679cb01eb9cbe621e8c5b1b34a0097.jpg",
      ]
    },
    user: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+1 (555) 123-4567"
    },
    pickupDate: "2025-04-10T10:00:00",
    returnDate: "2025-04-15T10:00:00",
    totalPrice: 450.00
  },
  {
    id: "B12346",
    car: {
      name: "Honda Civic",
      images: [
        "https://th.bing.com/th/id/R.12bcd019bc0da4de34f5b8663bca257c?rik=tGMZCcRLh4D%2fhg&pid=ImgRaw&r=0",
        "https://th.bing.com/th/id/OIP.3_ZXl6ANk_6yn42W6Vl9HwHaE8?rs=1&pid=ImgDetMain"
      ]
    },
    user: {
      name: "Jane Smith",
      email: "janesmith@example.com",
      phone: "+1 (555) 987-6543"
    },
    pickupDate: "2025-04-12T09:00:00",
    returnDate: "2025-04-14T18:00:00",
    totalPrice: 225.00
  },
  {
    id: "B12347",
    car: {
      name: "Toyota Corolla 2024",
      images: [
        "https://autotest.com.ar/wp-content/uploads/2023/09/Toyota-Corolla-2024-trompa-1.jpg",
        "https://fotos.perfil.com/2022/06/03/toyota-corolla-1366413.jpg",
      ]
    },
    user: {
      name: "Robert Johnson",
      email: "robertj@example.com",
      phone: "+1 (555) 234-5678"
    },
    pickupDate: "2025-04-15T14:00:00",
    returnDate: "2025-04-20T14:00:00",
    totalPrice: 875.00
  },
  {
    id: "B12348",
    car: {
      name: "Ford Focus",
      images: [
        "https://th.bing.com/th/id/R.7317462d09d933c7c41e2a9b22e132cb?rik=8LBFatxZ6BGKDw&riu=http%3a%2f%2fronnielogues.com%2fwp-content%2fuploads%2f2014%2f03%2flamarque-ford-2015-ford-focus.jpg&ehk=YnDFVMC8DVN3Yt5Y%2fl1RDDyIyERUdA2LWfqzZRQB6yI%3d&risl=&pid=ImgRaw&r=0",
        "https://stage-drupal.car.co.uk/s3fs-public/styles/original_size/public/2020-07/ford-focus-interior.jpg?VanDVsVRxF6CZLUoWiouiYFI3V7cYag3&itok=XYMeupaj",
        "https://th.bing.com/th/id/OIP.k1h5NUOhmmKUgjz97P-UjAHaFj?w=640&h=480&rs=1&pid=ImgDetMain",
      ]
    },
    user: {
      name: "Sarah Williams",
      email: "sarahw@example.com",
      phone: "+1 (555) 345-6789"
    },
    pickupDate: "2025-04-18T11:00:00",
    returnDate: "2025-04-25T11:00:00",
    totalPrice: 1050.00
  },
  {
    id: "B12349",
    car: {
      name: "Dongfeng Rich 6 EV",
      images: [
        "https://www.ev24.africa/wp-content/uploads/2025/02/DONFENG-RICH-6V.jpg",
        "https://obaidicarsjo.com/wp-content/uploads/2022/11/DSC03224.jpg",
        "https://www.dongfeng.ec/hubfs/Rich%20EV/RICH%206%20EV%20INTERIOR%206-min.jpg",
      ]
    },
    user: {
      name: "Michael Brown",
      email: "michaelb@example.com",
      phone: "+1 (555) 456-7890"
    },
    pickupDate: "2025-04-20T09:00:00",
    returnDate: "2025-04-23T18:00:00",
    totalPrice: 675.00
  },
  {
    id: "B12350",
    car: {
      name: "Toyota Camry",
      images: [
        "https://www.motortrend.com/uploads/sites/10/2017/11/2016-toyota-camry-se-sedan-angular-front.png",
        "https://i.pinimg.com/originals/d6/67/9c/d6679cb01eb9cbe621e8c5b1b34a0097.jpg",
      ]
    },
    user: {
      name: "Emily Davis",
      email: "emilyd@example.com",
      phone: "+1 (555) 567-8901"
    },
    pickupDate: "2025-04-22T10:00:00",
    returnDate: "2025-04-24T10:00:00",
    totalPrice: 180.00
  }
];
//branches
// Add this to your existing mockData.jsx file

export const branches = [
  {
    id: "BR001",
    name: "Nyenyeri Branch",
    image: "https://www.ingellipse.fr/wp-content/uploads/2023/01/construction-batiment-de-bureaux-commerce-dardilly-1.jpg",
    address: "Mutanga Nord Av Inkondo No 123",
    region: "Bujumbura",
    cars: [
      {
        id: "C001",
        name: "Toyota",
        model: "Corolla",
        year: 2023,
        image: "https://autotest.com.ar/wp-content/uploads/2023/09/Toyota-Corolla-2024-trompa-1.jpg",
        price: 45
      },
      {
        id: "C002",
        name: "Honda",
        model: "Civic",
        year: 2022,
        image: "https://th.bing.com/th/id/R.12bcd019bc0da4de34f5b8663bca257c?rik=tGMZCcRLh4D%2fhg&pid=ImgRaw&r=0",
        price: 50
      },
      {
        id: "C003",
        name: "Nissan",
        model: "Sentra",
        year: 2023,
        image: "https://www.motortrend.com/uploads/sites/10/2019/01/2019-nissan-sentra-s-cvt-sedan-angular-front.png",
        price: 48
      }
    ]
  },
  {
    id: "BR002",
    name: "Kwezi Branch",
    image: "https://www.bretagneportedeloire.fr/medias/2024/01/Photo-batiment-bain.jpg",
    address: "Gitega, 123 Bvd Bukama",
    region: "Gitega Province",
    cars: [
      {
        id: "C004",
        name: "Toyota",
        model: "Camry",
        year: 2022,
        image: "https://www.motortrend.com/uploads/sites/10/2017/11/2016-toyota-camry-se-sedan-angular-front.png",
        price: 60
      },
      {
        id: "C005",
        name: "Ford",
        model: "Escape",
        year: 2023,
        image: "https://file.kelleybluebookimages.com/kbb/base/evox/CP/50485/2023-Ford-Escape-front_50485_032_1856x862_UM_cropped.png",
        price: 65
      },
      {
        id: "C006",
        name: "Hyundai",
        model: "Tucson",
        year: 2022,
        image: "https://www.automobilemag.com/uploads/sites/5/2020/09/2022-Hyundai-Tucson-2.jpg",
        price: 62
      },
      {
        id: "C007",
        name: "Chevrolet",
        model: "Malibu",
        year: 2023,
        image: "https://www.chevy-2023.com/wp-content/uploads/2021/08/2023-Chevy-Malibu-Exterior.png",
        price: 58
      }
    ]
  },
  {
    id: "BR003",
    name: "Zuba Branch",
    image: "https://th.bing.com/th/id/R.c73292fb2f866ebb7025d0799222b20f?rik=9x2SuxlRoxT81w&riu=http%3a%2f%2fatelier94.ch%2fphpThumb%2fphpThumb.php%3fsrc%3d%2fuseruploads%2fmodule_galleries%2fp179hoblsodsgtnq1v051e5f68t4.jpg%26w%3d940%26h%3d620%26zc%3d1&ehk=NUI3YW00RwSHJyFixnJmB6jUEVvJgU8XmcujfNoVbNQ%3d&risl=&pid=ImgRaw&r=0",
    address: "Burunga, 879 Bvd de la ville",
    region: "Burunga Province",
    cars: [
      {
        id: "C008",
        name: "Jeep",
        model: "Wrangler",
        year: 2023,
        image: "https://images.carexpert.com.au/resize/3000/-/app/uploads/2023/06/jeep-wrangler-nighteagle-4door-hydro-blue.jpg.img_.2880.jpg",
        price: 85
      },
      {
        id: "C009",
        name: "Ford",
        model: "Mustang",
        year: 2022,
        image: "https://platform.cstatic-images.com/in/v2/stock_photos/90884105-7fd5-4da9-8479-27e482a4e479/2b678835-3279-4de7-8047-36484d4e2900.png",
        price: 95
      }
    ]
  },

];