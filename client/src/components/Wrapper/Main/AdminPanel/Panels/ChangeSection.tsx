import React from 'react';
import { observer } from 'mobx-react';
import preloaderReducer from '../../../Windows/Preloader/preloaderReducer';
import adminPanelReducer from '../adminPanelReducer';
import Select from '../../../../JSXElements/Select/Select';
import FileInputContainer from '../../../../JSXElements/FileInputContainer/FileInputContainer';
import mainReducer from '../../mainReducer';

const ChangeSection: React.FC = () => {
  const state = adminPanelReducer.state;

  const adminPanel = state.panels.find((adminPanel) => adminPanel._id === 'ChangeSection');
  const changedSection = state.changedSection;

  return (
    <div className={adminPanel._id + ' window'} data-selected={adminPanel._id}>
      <form
        onSubmit={(e) => {
          adminPanelReducer.changeSection(e);
        }}
      >
        <h1>{adminPanel.section}</h1>

        <label htmlFor="ChooseNavigations">Изменяемая категория</label>
        <div className="InputContainer">
          <i className="fas fa-bars"></i>
          <Select
            inputName="category"
            onSelect={adminPanelReducer.selectChangedCategory.bind(adminPanelReducer)}
            options={mainReducer.state.mainNavigations
              .filter(({ changeable }) => changeable)
              .map(({ category, name }) => ({ _id: category, name }))}
            defaultTitle="Выберите категорию"
          ></Select>
        </div>

        {state.changedCategories.length ? (
          <>
            <label htmlFor="ChooseSubCategory">Изменяемая подкатегория</label>
            <div className="InputContainer">
              <i className="fas fa-folder-open"></i>
              <Select
                inputName="oldSubCategory"
                onSelect={adminPanelReducer.selectChangedSubCategories.bind(adminPanelReducer)}
                options={mainReducer
                  .getUniqueSubCategories(state.changedCategories)
                  .map((elem) => ({
                    _id: elem,
                    name: elem ? elem : 'Без подкатегории',
                  }))}
                defaultTitle="Выберите подкатегорию"
                isNullValue={!state.changedSubCategories.length}
              ></Select>
            </div>

            {state.changedSubCategories.length ? (
              <>
                <label htmlFor="ChooseSection">Изменяемый раздел</label>
                <div className="InputContainer">
                  <i className="far fa-folder-open"></i>
                  <Select
                    inputName="sectionId"
                    onSelect={adminPanelReducer.selectChangedSection.bind(adminPanelReducer)}
                    options={state.changedSubCategories.map(({ _id, section }) => ({
                      _id,
                      name: section,
                    }))}
                    defaultTitle="Выберите раздел"
                    isNullValue={!changedSection}
                  ></Select>
                </div>

                {changedSection ? (
                  <>
                    <label htmlFor="NewCategoryDescription">Описание категории</label>
                    <textarea
                      id="NewCategoryDescription"
                      name="startDescription"
                      placeholder="Введите описание категории"
                      defaultValue={changedSection.startDescription}
                    />

                    <label htmlFor="NewSubCategory">Имя подкатегории</label>
                    <div className="InputContainer">
                      <i className="fas fa-marker"></i>
                      <input
                        id="NewSubCategory"
                        name="subCategory"
                        type="text"
                        placeholder="Введите имя подкатегории"
                        defaultValue={changedSection.subCategory}
                      />
                    </div>

                    <label htmlFor="NewSectionName">Имя раздела</label>
                    <div className="InputContainer">
                      <i className="fas fa-pencil-alt"></i>
                      <input
                        id="NewSectionName"
                        name="section"
                        type="text"
                        placeholder="Введите имя раздела"
                        defaultValue={changedSection.section}
                        required
                      />
                    </div>

                    <label htmlFor="NewSectionDescription">Описание раздела</label>
                    <textarea
                      id="NewSectionDescription"
                      name="description"
                      placeholder="Введите описание раздела"
                      defaultValue={changedSection.description.join('\n')}
                    />

                    <label htmlFor="NewVideosNames">Имена видео</label>
                    <div className="InputContainer">
                      <i className="fas fa-video"></i>
                      <input
                        id="NewVideosNames"
                        name="videoNames"
                        type="text"
                        placeholder="Введите имена видео, разделенные знаком '/'"
                        defaultValue={changedSection.videoNames.join('/')}
                      />
                    </div>

                    <label htmlFor="NewVideosLinks">Ссылки видео в ютубе</label>
                    <div className="InputContainer">
                      <i className="fab fa-youtube"></i>
                      <input
                        id="NewVideosLinks"
                        name="videoLinks"
                        type="text"
                        placeholder="Введите ссылки на видео, разделенные знаком '/'"
                        defaultValue={changedSection.videoLinks.join('/')}
                      />
                    </div>

                    {changedSection.photoNames.length ? (
                      <>
                        <label htmlFor="NewSectionPhotos">Фото события</label>
                        <div className="SelectedSectionPhotos">
                          {changedSection.photoNames.map((photoName) => {
                            return (
                              <div key={photoName}>
                                <img
                                  src={`${mainReducer.state.imagesUrl}${changedSection.category}/${
                                    changedSection.subCategory
                                      ? changedSection.subCategory + '/'
                                      : ''
                                  }${photoName}`}
                                  alt="Картинка не загрузилась"
                                />
                                <button
                                  className="deleteButton"
                                  onClick={() => {
                                    adminPanelReducer.deleteSectionPhoto(photoName);
                                  }}
                                  disabled={preloaderReducer.state.activatePreloader}
                                >
                                  Удалить фото
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      ''
                    )}

                    <FileInputContainer
                      id="AddNewSectionPhotos"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        adminPanelReducer.uploadPhotos(e, 'ChangeSection');
                      }}
                      multiple={true}
                    ></FileInputContainer>

                    <button
                      className="DeleteSection deleteButton"
                      onClick={() => {
                        adminPanelReducer.deleteSection();
                      }}
                      disabled={preloaderReducer.state.activatePreloader}
                    >
                      <i className="fas fa-minus-circle"></i>Удалить раздел
                    </button>

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
              </>
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}
      </form>
    </div>
  );
};

export default observer(ChangeSection);
