const ProgressDisplay = ({ progress }) => {
  return (
      <div className="flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
              ></div>
          </div>
          <div className="text-xs mx-1">{`${progress}%`}</div>
      </div>
  );
};

export default ProgressDisplay;
