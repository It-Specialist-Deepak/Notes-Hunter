
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <section className=" bg-gradient-to-br from-gray-800 to-slate-900 text-white py-16 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-center text-sm md:text-left mb-8 md:mb-12">
          {/* Column 1 */}
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <h2 className="text-2xl font-bold">Notes Hunter</h2>
            <p className="opacity-50 mt-3 lg:w-3/4">
             Empowering students and educators to share knowledge through our digital notes. Join our community and discover valuable study materials from around the world.
            </p>
            <h5 className="mt-6 mb-3 text-lg font-semibold">Follow Us</h5>
            <ul className="flex justify-center md:justify-start space-x-3">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center w-9 h-9 rounded-full
                 bg-white text-gray-800
                 hover:bg-blue-600 hover:text-white transition"
                >
                  <FaFacebookF size={16} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center w-9 h-9 rounded-full
                 bg-white text-gray-800
                 hover:bg-blue-400 hover:text-white transition"
                >
                  <FaTwitter size={16} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center w-9 h-9 rounded-full
                 bg-white text-gray-800
                 hover:bg-blue-800 hover:text-white transition"
                >
                  <FaLinkedinIn size={16} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center justify-center w-9 h-9 rounded-full
                 bg-white text-gray-800
                 hover:bg-pink-600 hover:text-white transition"
                >
                  <FaInstagram size={16} />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="w-1/2 sm:w-1/3 md:w-1/6 mb-6 md:mb-0">
            <h5 className="mb-3 font-semibold">Notes</h5>
            <ul className="space-y-2">
              <li>
                <a href="#!" className="opacity-50 hover:opacity-100">
                  Browse/ Collection
                </a>
              </li>
              <li>
                <a href="#!" className="opacity-50 hover:opacity-100">
                  Categories
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-1/2 sm:w-1/3 md:w-1/6 mb-6 md:mb-0">
            <h5 className="mb-3 font-semibold">Previous Year Papers</h5>
            <ul className="space-y-2">
              <li>
                <a href="#!" className="opacity-50 hover:opacity-100">
                  Browse/ Collection
                </a>
              </li>
              <li>
                <a href="#!" className="opacity-50 hover:opacity-100">
                  Categories
                </a>
              </li>
             
            </ul>
          </div>

          {/* Column 4 */}
          <div className="w-1/2 sm:w-1/3 md:w-1/6 mb-6 md:mb-0">
            <h5 className="mb-3 font-semibold">Others</h5>
            <ul className="space-y-2">
              <li>
                <a href="#!" className="opacity-50 hover:opacity-100">
                  Courses
                </a>
              </li>
              <li>
                <a href="#!" className="opacity-50 hover:opacity-100">
                  About Us
                </a>
              </li>
              <li>
                <a href="#!" className="opacity-50 hover:opacity-100">
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5 */}
          {/* <div className="w-1/2 sm:w-1/3 md:w-1/6 mb-6 md:mb-0">
            <h5 className="mb-3 font-semibold">Services</h5>
            <ul className="space-y-2">
              <li>
                <a href="#!" className="opacity-50 hover:opacity-100">
                  Option
                </a>
              </li>
              <li>
                <a href="#!" className="opacity-50 hover:opacity-100">
                  Privling Page
                </a>
              </li>
              <li>
                <a href="#!" className="opacity-50 hover:opacity-100">
                  Account
                </a>
              </li>
            </ul>
          </div> */}
        </div>

        <hr className="border-gray-600 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="opacity-50 mb-2 md:mb-0">
            &copy; {currentYear} Notes Hunter. All rights reserved.
          </p>
          <ul className="flex space-x-4 justify-center md:justify-end">
            <li>
              <a href="#!" className="opacity-50 hover:opacity-100">
                Privacy
              </a>
            </li>
            <li>
              <a href="#!" className="opacity-50 hover:opacity-100">
                Security
              </a>
            </li>
            <li>
              <a href="#!" className="opacity-50 hover:opacity-100">
                Terms
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
