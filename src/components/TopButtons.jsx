
function TopButtons({ setQuery }) {

  const cities = [
    {
      id: 1,
      title: 'Tehran'
    },
    {
      id: 2,
      title: 'Frankfurt'
    },
    {
      id: 3,
      title: 'London'
    },
    {
      id: 4,
      title: 'Sydney'
    },
    {
      id: 5,
      title: 'New york'
    },
  ]



  return (
    <div className="hidden  md:flex items-center justify-around my-0 ">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-white text-lg font-medium mx-3 my-2"
          onClick={() => {
            setQuery({ q: city.title })
            localStorage.setItem('city', city.title)
          }}
        >
          {city.title}
        </button>
      ))}
    </div>
  )
}

export default TopButtons