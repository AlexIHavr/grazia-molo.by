import React from 'react';
import { observer } from 'mobx-react';
import preloaderReducer from '../../../Windows/Preloader/preloaderReducer';
import adminPanelReducer from '../adminPanelReducer';
import FileInputContainer from '../../../../JSXElements/FileInputContainer/FileInputContainer';
import Select from '../../../../JSXElements/Select/Select';
import mainReducer from '../../mainReducer';

const CreateSection: React.FC = () => {
  const state = adminPanelReducer.state;
  const adminPanel = state.panels.find((adminPanel) => adminPanel._id === 'CreateSection');
  const withSubCategory = mainReducer.state.mainNavigations.find(
    ({ category }) => category === state.selectedCategory
  )?.withSubCategories;

  return (
    <div className={adminPanel._id + ' window'} data-selected={adminPanel._id}>
      <form
        onSubmit={(e) => {
          adminPanelReducer.createSection(e);
        }}
      >
        <h1>{adminPanel.section}</h1>

        <label htmlFor="ChooseNavigation">Изменяемая категория</label>
        <div className="InputContainer">
          <i className="fas fa-bars"></i>
          <Select
            inputName="category"
            onSelect={adminPanelReducer.selectCategory.bind(adminPanelReducer)}
            options={mainReducer.state.mainNavigations
              .filter(({ changeable }) => changeable)
              .map(({ category, name }) => ({ _id: category, name }))}
            defaultTitle="Выберите категорию"
          ></Select>
        </div>

        {state.selectedCategory ? (
          <>
            {withSubCategory &&
            !mainReducer.getCategoryNavigations(state.selectedCategory).length ? (
              <>
                <label htmlFor="CategoryDescription">Описание категории</label>
                <textarea
                  id="CategoryDescription"
                  name="startDescription"
                  placeholder="Введите описание категории"
                />
              </>
            ) : (
              ''
            )}

            {withSubCategory ? (
              <>
                <label htmlFor="SubCategory">Имя подкатегории</label>
                <div className="InputContainer">
                  <i className="fas fa-folder-open"></i>
                  <input
                    id="SubCategory"
                    name="subCategory"
                    type="text"
                    placeholder="Введите имя подкатегории"
                    required
                  />
                </div>
              </>
            ) : (
              ''
            )}

            <label htmlFor="SectionName">Имя раздела</label>
            <div className="InputContainer">
              <i className="fas fa-pencil-alt"></i>
              <input
                id="SectionName"
                name="section"
                type="text"
                placeholder="Введите имя раздела"
                required
              />
            </div>

            <label htmlFor="SectionDescription">Описание раздела</label>
            <textarea
              id="SectionDescription"
              name="description"
              placeholder="Введите описание раздела"
            />

            <label htmlFor="VideosNames">Имена видео</label>
            <div className="InputContainer">
              <i className="fas fa-video"></i>
              <input
                id="VideosNames"
                name="videoNames"
                type="text"
                placeholder="Введите имена видео, разделенные знаком '/'"
              />
            </div>

            <label htmlFor="VideosLinks">Ссылки видео в ютубе</label>
            <div className="InputContainer">
              <i className="fab fa-youtube"></i>
              <input
                id="VideosLinks"
                name="videoLinks"
                type="text"
                placeholder="Введите ссылки на видео, разделенные знаком '/'"
              />
            </div>

            <FileInputContainer
              id="AddEventPhotos"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                adminPanelReducer.uploadPhotos(e, 'CreateSection');
              }}
              multiple={true}
            ></FileInputContainer>

            <div className="Errors">{adminPanel.errorMessage}</div>
            <div className="Successes">{adminPanel.successMessage}</div>

            <button
              type="submit"
              className="button"
              disabled={preloaderReducer.state.activatePreloader}
            >
              {adminPanel.section}
            </button>
          </>
        ) : (
          ''
        )}
      </form>
    </div>
  );
};

export default observer(CreateSection);
