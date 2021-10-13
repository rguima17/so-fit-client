import logo from "../assets/img/Logo.png";
import { useState } from "react";

function About() {
  const [translate, setTranslate] = useState(true);

  function handleButton() {
    setTranslate(!translate);
  }

  return (
    <main className="max-w-6xl">
      <div className="mx-4 md:mx-14 lg:mx-20">
        <h1 className="text-3xl md:text-4xl tracking-tight font-bold text-gray-900 ">
          <div className="flex justify-start my-5">
            <span className="block xl:inline"> About So Fit</span>
            <img className="h-8 w-auto mx-3" src={logo} alt="Logo" />
            <div className="flex flex-row justify-end">
              <button
                onClick={handleButton}
                className="text-xs ml-7 lg:text-sm lg:ml-32 border-black border px-1 rounded-md  "
              >
                {translate ? "PT-BR" : "EN-US"}
              </button>{" "}
              <div className="flex h-3 w-3 -ml-1">
                <span
                  className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-black opacity-75"
                  style={{ backgroundColor: "#6366F1" }}
                ></span>
                <span
                  className="relative inline-flex rounded-full h-3 w-3 bg-black"
                  style={{ backgroundColor: "#6366F1" }}
                ></span>
              </div>
            </div>
          </div>
        </h1>
        <div className="mt-3 text-base text-gray-500  sm:text-lg my-12   md:text-xl ">
          {translate ? (
            <p className="text-justify mb-3">
              So Fit is a 10-day project made during the final two weeks of
              IronHack BootCamp. You can learn more about this project in our
              Github repositories:{" "}
              <a
                href="https://github.com/MFAP-1/so-fit-server"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                BackEnd
              </a>{" "}
              and{" "}
              <a
                href="https://github.com/rguima17/so-fit-client"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                FrontEnd
              </a>
              . This web app aims to help people turning their fitness life into
              a more pleasant/exciting one. Within our app the main features
              are:
            </p>
          ) : (
            <p className="text-justify mb-3">
              So Fit é um projeto realizado em 10 dias durante as duas semanas
              finais do IronHack BootCamp. Você pode conehcer mais sobre este
              projeto em nossos repositórios no Github:{" "}
              <a
                href="https://github.com/MFAP-1/so-fit-server"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                BackEnd
              </a>{" "}
              e{" "}
              <a
                href="https://github.com/rguima17/so-fit-client"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                FrontEnd
              </a>
              . Este aplicativo tem como objetivo ajudar as pessoas a deixarem
              suas vidas fitness mais agradáveis e excitantes. Dentro de nosso
              aplicativo os principais recursos são:
            </p>
          )}
          <div className=" ml-7 ">
            {translate ? (
              <div >
                <li className="mb-1 text-justify ">
                  You can plan your workouts and then share it with your
                  friends;
                </li>
                <li className="mb-1 text-justify ">
                  After marking a workout as done, you earn <i>So Fit Points</i>{" "}
                  based on the exercises, allowing you to gain level;{" "}
                </li>
                <li className="mb-1 text-justify">
                  A leaderboard to track the ranking of the users based on their{" "}
                  <i>So Fit Points</i>;{" "}
                </li>
                <li className="mb-1 text-justify">
                  Following system, likes and comments, as in any social media;{" "}
                </li>
                <li className="mb-1 text-justify">
                  Two types of chronometers, a regular one and a tabata
                  chronometer;{" "}
                </li>
                <li className="mb-1 text-justify ">Responsive design.</li>{" "}
              </div>
            ) : (
              <div>
                <li className="mb-1 text-justify">
                Você pode planejar seus treinos e depois compartilhá-los com seus
                  amigos;
                </li >
                <li className="mb-1 text-justify">
                Depois de marcar um treino como concluído, você ganha <i>So Fit Points</i>, permitindo que aumente de nível;{" "}
                </li>
                <li className="mb-1 text-justify">
                Tabela de classificação para rastrear a classificação dos usuários com base em seus <i>So Fit Points</i>;
                </li>
                <li className="mb-1 text-justify">
                  Sistema de likes, comentários, follow/unfollow, assim como qualquer rede social;{" "}
                </li>
                <li className="mb-1 text-justify">
                 Dois tipos de cronômetros, um regular e outro tabata;
                  
                </li>
                <li className="mb-1 text-justify">Design responsivo.</li>
              </div>
            )}
          </div>
          <div className="mt-3 lg:mt-9">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Developers:
            </h2>
            <div className="flex flex-col md:flex-row  md:justify-around mt-3 lg:mt-5  ml-7 lg:ml-2 ">
              <div className="flex flex-row items-center">
                Manoel Pereira
                <a
                  href="https://github.com/MFAP-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-2 text-black ml-1 "
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/manoel-pereira-eng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-2 text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                    fill="none"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>

              <div className="flex flex-row items-center my-2">
                Raul Guimaraes{" "}
                <a
                  href="https://github.com/rguima17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-2 text-black  ml-1"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/raul-guimaraes-073b3997/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-2 text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                    fill="none"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
              <div className="flex flex-row items-center">
                Nilton Escame{" "}
                <a
                  href="https://github.com/nfescame"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-2 text-black  ml-1"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/nilton-escame/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pr-2 text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                    fill="none"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
