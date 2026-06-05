function Footer() {

  return (

    <footer
      id="contact"
      className="
      bg-slate-900
      text-white
      py-12
    "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        flex
        flex-col
        md:flex-row
        justify-between
      "
      >

        <div>

          <h3
            className="
            text-2xl
            font-bold
          "
          >
            ATS Resume Checker
          </h3>

          <p
            className="
            mt-3
            text-gray-400
          "
          >
            Improve your resume and
            increase interview chances.
          </p>

        </div>

        <div
          className="
          mt-8
          md:mt-0
        "
        >

          <p>Email:</p>

          <p
            className="
            text-gray-400
          "
          >
            thotipoornachandra@gmail.com
          </p>

        </div>

      </div>

    </footer>

  );

}

export default Footer;