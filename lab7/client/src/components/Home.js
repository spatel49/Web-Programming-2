import React from 'react';
import '../App.css';

const Home = () => {
  return (
    <div>
      <p>
      Marvel Comics is the brand name and primary imprint of Marvel Worldwide Inc., formerly Marvel Publishing, Inc. and Marvel Comics Group, a publisher of American comic books and related media. In 2009, The Walt Disney Company acquired Marvel Entertainment, Marvel Worldwide's parent company. Marvel was started in 1939 by Martin Goodman under a number of corporations and imprints but now known as Timely Comics,[3] and by 1951 had generally become known as Atlas Comics. The Marvel era began in 1961, the year that the company launched The Fantastic Four and other superhero titles created by Stan Lee, Jack Kirby, Steve Ditko and many others. The Marvel brand, which had been used over the years, was solidified as the company's primary brand. Marvel counts among its characters such well-known superheroes as Spider-Man, Iron Man, Captain America, the Hulk, Thor, Wolverine, Ant-Man, the Wasp, Black Widow, Captain Marvel, Black Panther, Doctor Strange, the Scarlet Witch, the Vision, Ghost Rider, Blade, Daredevil, the Punisher and Deadpool. Superhero teams exist such as the Avengers, the X-Men, the Fantastic Four and the Guardians of the Galaxy as well as supervillains including Doctor Doom, Magneto, Thanos, Loki, Green Goblin, Kingpin, Red Skull, Ultron, the Mandarin, MODOK, Doctor Octopus, Kang, Dormammu, Venom and Galactus. Most of Marvel's fictional characters operate in a single reality known as the Marvel Universe, with most locations mirroring real-life places; many major characters are based in New York City.[4] Additionally, Marvel has published several licensed properties from other companies. This includes Star Wars comics twice from 1977 to 1986 and again since 2015.
      </p>

      <p className="hometext">
        The application queries three of Marvel API's end-points:
        <br></br>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://gateway.marvel.com/v1/public/characters"
        >
          https://gateway.marvel.com/v1/public/characters
        </a>,
        <br></br>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://gateway.marvel.com/v1/public/comics"
        >
          https://gateway.marvel.com/v1/public/comics
        </a>,
        <br></br>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://gateway.marvel.com/v1/public/series"
        >
          https://gateway.marvel.com/v1/public/series
        </a>
        <br></br>
        You may sign up for an API Key here: <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://developer.marvel.com/"
        >
          https://developer.marvel.com/
        </a>
      </p>
    </div>
  );
};

export default Home;