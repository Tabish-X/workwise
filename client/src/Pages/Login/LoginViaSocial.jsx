const LoginViaSocial = () => {
  return (
    <div className="w-full text-center">
      <h3 className="uppercase my-6 font-semibold text-sm">
        Login via social account
      </h3>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="text-sm text-white-pure px-3 py-2 bg-[#3b5998] rounded-sm">
          <i className="fa-brands fa-facebook-f mr-2"></i>
          <span>login via facebook</span>
        </button>
        <button className="text-sm text-white-pure px-3 py-2 bg-[#4099ff] rounded-sm">
          <i className="fa-brands fa-twitter mr-2"></i>
          <span>login via twitter</span>
        </button>
      </div>
    </div>
  );
};

export default LoginViaSocial;
