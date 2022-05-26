import iconArt from '../components/assets/rainbow.svg';
import iconCollectibles from '../components/assets/bear.svg';
import iconSports from '../components/assets/soccerball.svg';
import iconUtility from '../components/assets/tools.svg';
import iconTrading from '../components/assets/cardboard.svg';
import iconVirtual from '../components/assets/monster.svg';
import iconDomain from '../components/assets/domain.svg';

export const GroupFilters = [
  {
    value: 'all',
    label: 'All Items',
  },
  {
    value: 'single',
    label: 'Single Items',
  },
  // {
  //   value: 'bundle',
  //   label: 'Bundles',
  // },
];

export const Categories = [
  {
    id: 0,
    icon: iconArt,
    label: 'Art',
  },
  {
    id: 1,
    icon: iconCollectibles,
    label: 'Collectibles',
  },
  {
    id: 2,
    icon: iconSports,
    label: 'Sports',
  },
  {
    id: 3,
    icon: iconUtility,
    label: 'Utility',
  },
  {
    id: 4,
    icon: iconTrading,
    label: 'Trading Cards',
  },
  {
    id: 5,
    icon: iconVirtual,
    label: 'Virtual Worlds',
  },
  {
    id: 6,
    icon: iconDomain,
    label: 'Domain Names',
  },
];

export const SortByOptions = [
  {
    id: 'createdAt',
    label: 'Recently Created',
  },
  {
    id: 'oldest',
    label: 'Oldest',
  },
  {
    id: 'listedAt',
    label: 'Recently Listed',
  },
  {
    id: 'soldAt',
    label: 'Recently Sold',
  },
  {
    id: 'saleEndsAt',
    label: 'Ending Soon',
  },
  {
    id: 'price',
    label: 'Highest Price',
  },
  {
    id: 'cheapest',
    label: 'Lowest Price',
  },
  {
    id: 'lastSalePrice',
    label: 'Highest Last Sale',
  },
  {
    id: 'viewed',
    label: 'Mostly Viewed',
  },
];

const FilterConstants = {
  UPDATE_STATUS_FILTER: 'UPDATE_STATUS_FILTER',
  UPDATE_COLLECTIONS_FILTER: 'UPDATE_COLLECTIONS_FILTER',
  UPDATE_CATEGORIES_FILTER: 'UPDATE_CATEGORIES_FILTER',
  UPDATE_GROUP_TYPE_FILTER: 'UPDATE_GROUP_TYPE_FILTER',
  UPDATE_SORT_BY_FILTER: 'UPDATE_SORT_BY_FILTER',
};

export default FilterConstants;
