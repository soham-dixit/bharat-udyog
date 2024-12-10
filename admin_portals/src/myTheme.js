export default {
    button: {
        base: 'align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none',
        block: 'w-full',
        size: {
          larger: 'px-10 py-4 rounded-lg',
          large: 'px-5 py-3 rounded-lg',
          regular: 'px-4 py-2 rounded-lg text-sm',
          small: 'px-3 py-1 rounded-md text-sm',
          icon: {
            larger: 'p-4 rounded-lg',
            large: 'p-3 rounded-lg',
            regular: 'p-2 rounded-lg',
            small: 'p-2 rounded-md'
          },
          pagination: 'px-3 py-1 rounded-md text-xs'
        },
        // styles applied to the SVG icon
        icon: {
          larger: 'h-5 w-5',
          large: 'h-5 w-5',
          regular: 'h-5 w-5',
          small: 'h-3 w-3',
          left: 'mr-2 -ml-1',
          right: 'ml-2 -mr-1'
        },
        primary: {
          base: 'text-white bg-red-600 border border-transparent',
          active: 'active:bg-red-600 hover:bg-red-700 focus:shadow-outline-purple',
          disabled: 'opacity-50 cursor-not-allowed'
        },
        outline: {
          base: 'text-gray-600 border-gray-300 border dark:text-gray-400 focus:outline-none',
          active: 'active:bg-transparent hover:border-gray-500 focus:border-gray-500 active:text-gray-500 focus:shadow-outline-gray',
          disabled: 'opacity-50 cursor-not-allowed bg-gray-300'
        },
        link: {
          base: 'text-gray-600 dark:text-gray-400 focus:outline-none border border-transparent',
          active: 'active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:hover:bg-opacity-10',
          disabled: 'opacity-50 cursor-not-allowed'
        },
        // this is the button that lives inside the DropdownItem
        dropdownItem: {
          base: 'inline-flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200'
        }
      },
  }