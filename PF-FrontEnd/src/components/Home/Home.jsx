import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Ads from '../Ads/Ads';
import Brands from '../Brands/Brands';
import Categories from '../Categories/Categories';
import style from './Home.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { 
          showLoadingSectionOne,
          showLoadingSectionTwo,
          showLoadingSectionThree,
          getProductsToSectionOne,
          getProductsToSectionTwo,
          getProductsToSectionThree,
          resetSections
        } from '../../redux/actions';
import SectionCatalogue from '../SectionCatalogue/SectionCatalogue';
import Loading from '../SVG/Loading';
import { chooseRandom } from '../../util';
import CommonButton from '../common/CommonButton/CommonButton';

export default function Home () {

  const dispatch = useDispatch();
  const history = useHistory();
  const { section, allCategories, brandsList } = useSelector(state => state.homepage);
  const [ chooseSection, setChooseSection ] = useState({
    two: '',
    three: '',
    show: false
  });
  const [ loadingSections, setLoadingSections ] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/customizedPC");    
  };

  React.useEffect(() => {
    dispatch(showLoadingSectionOne());
    dispatch(showLoadingSectionTwo());
    dispatch(showLoadingSectionThree());

    return () => {
      dispatch(resetSections());
      setChooseSection({
        two: '',
        three: '',
        show: false
      });
      setLoadingSections(false);
    }
  }, []);

  React.useEffect(() => {
    if (allCategories.length > 0 && brandsList.length > 0 && !loadingSections) { 
      getRandomLists();
      setLoadingSections(true);
    }
  }, [allCategories, brandsList]);

  let getRandomLists = function() {
    let sectionTwo = chooseRandom(allCategories);
    let sectionThree = chooseRandom(brandsList);

    dispatch(getProductsToSectionOne('page=1&discount=1&size=10&order=random'));
    dispatch(getProductsToSectionTwo(`page=1&category=${sectionTwo}&size=10&order=random`));
    dispatch(getProductsToSectionThree(`page=1&manufacturer=${sectionThree}&size=10&order=random`));

    setChooseSection({
      two: sectionTwo,
      three: sectionThree,
      show: true
    });
  }

  return (
    <div>
      <div className={style.ads}>
        <Ads/>
      </div>
      <div>
        <CommonButton
          variant="contained"
          onClick={(e) => handleClick(e)}
          size="large"
          sx={{
            mt: 6,
            ml: '43%',
            justifyContent: "center",
            position: "relative",
          }}
          >Custom PC Builder</CommonButton>
      </div>
      <div className={style.catalogue}>
        {
          !chooseSection.show &&
          <div className = {style.noProductsContainer}>
            <div className = {style.imageContainer}>
              <Loading />
            </div>
            <span className = {style.span}>Loading Sections...</span>
          </div>
        }
        {
          chooseSection.show && 
          <>
            <SectionCatalogue 
              sectionPath = { '/store/discount/show' }
              sectionName = { 'Products On Discount' }
              products = { section.one }
              loading = { section.showLoadingOne }
              error = { section.errorOne }
            />
            <SectionCatalogue 
              sectionPath = { `/store/category/${chooseSection.two}` }
              sectionName = { chooseSection.two }
              products = { section.two }
              loading = { section.showLoadingTwo }
              error = { section.errorTwo }
            />
            <SectionCatalogue 
              sectionPath = { `/store/brand/${chooseSection.three}` }
              sectionName = { chooseSection.three }
              products = { section.three }
              loading = { section.showLoadingThree }
              error = { section.errorTwo }
            />
          </>
        }
      </div>
      <Categories />
      <div className={style.brandsTitle}>
        <h3>BRANDS</h3>
      </div>
      <Brands />
    </div>
  )
};