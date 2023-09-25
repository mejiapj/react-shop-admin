import endPoints from '@services/api';
import useFetch from '@hooks/useFetch';
import { Chart } from '@common/Chart';

const PRODUCT_LIMIT = 15;
const PRODUCT_OFFSET = 15;

export default function Dashboard() {
  const products = useFetch(endPoints.products.getProducts(PRODUCT_LIMIT, PRODUCT_OFFSET));
  // console.log(products);
  //Con categoryNames se conoce cuántos elementos están dentro de las categorías
  const categoryNames = products?.map((product) => product.category);
  //Con categoryCount se conocen los nombres de las categorías
  const categoryCount = categoryNames?.map((category) => category.name);

  /* console.log(categoryNames);
  console.log(categoryCount);*/

  //Con countOcurrences se conoce el número de ocurrencias (frecuencia) que aparece cada categoría
  //Lógiga constante = (array, value) => array.reduce((a,v) => (v === value? a + 1: a), 0);
  const countOcurrences = (arr) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});
  /* console.log(countOcurrences(categoryCount)) */
  //El objeto data contiene la información necesaria para el gráfico
  const data = {
    datasets: [
      {
        label: 'Categories',
        data: countOcurrences(categoryCount),
        borderWidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50AF95', '#f3ba2f', '#2a71d0'],
      },
    ],
  };
  return (
    <>
      {<Chart className="mb-8 mt-2" chartData={data} />}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Id
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products?.map((product) => (
                    <tr key={`Product-item-${product.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={product.images[0]} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.category.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">${product.price}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="/edit" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="/edit" className="text-indigo-600 hover:text-indigo-900">
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
