import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import './PortfolioHero.css';
import { EditOutlined } from '@ant-design/icons';
import placeholderFolioImage from '../placeholder-folio-image.png';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Tooltip } from 'antd';
// import { useAuth0 } from '@auth0/auth0-react';
import Uploader from './Uploader';
import { stringList } from 'aws-sdk/clients/datapipeline';

type PortfolioHeroProps = {
  isOpen: boolean;
  isMyProfile: boolean;
  projectID?: string;
  userID?: string;
  new: boolean;
};

type PortfolioHeroData = {
  datePosted: string;
  link: string;
  mediaName: string;
  projectID: string;
  mediaType: string;
  userID: string;
};

function PortfolioHero(props: PortfolioHeroProps) {
  const { getAccessTokenSilently } = useAuth0();
  const [editing, setEditing] = useState(false);
  const [editingState, setEditingState] = useState(false);
  const [slide, setSlide] = useState(0);

  const [media, setMedia] = useState<PortfolioHeroData[]>();

  const isMyProfile = !props.userID ? true : false;

  // const [isLoading, setIsLoading] = useState(true);

  async function fetchData(): Promise<void> {
    // setIsLoading(true);

    // If there is no userID, fetch own profile
    const route = isMyProfile
      ? `project/media/getOwnMedia/${props.projectID}`
      : `project/media/${props.userID}`;

    // const route = 'project/media/30588745/1';

    try {
      const token = await getAccessTokenSilently();
      const res = await fetch('/api/' + route, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check response is okay
      if (!res.ok) {
        console.error('Invalid response code', res.status, res.statusText);
        return;
      }

      // Check if response has profile data
      const resBody = await res.json();
      const data = 'data' in resBody ? resBody['data'] : {};

      // Set profile data (empty object if invalid)
      // TODO: Could add warning?
      console.log('setting media...', { data });

      // data.sort((a: PortfolioObjectData, b: PortfolioObjectData) => {
      //   if (a.projectID && b.projectID) {
      //     if (a.projectID > b.projectID) return 1;
      //     else return -1;
      //   } else return 1;
      // });

      setMedia(data);
      // setIsLoading(false);
    } catch (e) {
      // if (setIsLoading) {
      //   setIsLoading(false);
      // }
      const res = {
        status: 'error',
        message: [
          'Exception from fetch on client side (not API) - check if the API stopped running',
          e,
        ],
      };
      console.error(res, e);
      //return res;
    }
  }

  // async function saveData(
  //   action: string,
  //   updatePortfolioHeroData: PortfolioHeroData[]
  // ): Promise<void> {
  //   //setIsLoading(true);

  //   const route = `media/${props.projectID}`;

  //   console.log(updatePortfolioHeroData);

  //   // Call API
  //   try {
  //     const token = await getAccessTokenSilently();
  //     const res = await fetch('/api/' + route, {
  //       method: action,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ data: updatePortfolioHeroData }),
  //     });

  //     // Check response is okay
  //     if (!res.ok) {
  //       console.error('Invalid response code', res.status, res.statusText);
  //       return;
  //     }
  //     console.log('updated successfully?', res.ok, res.statusText);
  //     // fetchData();
  //     // setIsLoading(false);
  //   } catch (e) {
  //     const res = {
  //       status: 'error',
  //       message: [
  //         'Exception from fetch on client side (not API) - check if the API stopped running',
  //         e,
  //       ],
  //     };
  //     console.error(res, e);
  //     //return res;
  //   }
  //   fetchData();
  // }

  async function uploadMedia(
    file: any,
    type: string,
    mediaCategory: string
  ): Promise<void> {
    const token = await getAccessTokenSilently();

    await fetch('/api/project/media', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          mediaCategory,
          file,
          fileType: type,
          projectID: props.projectID,
        },
      }),
    });
  }

  useEffect(() => {
    fetchData();
  }, [props.projectID]);

  // props.isOpen ?
  if (props.isOpen) {
    return (
      <div
        className={`portfolio-hero  ${
          (editing ? 'portfolio-hero-edit container-scroll' : '') +
          (!media || media?.length === 0 ? ' container-media ' : '')
        }`}
      >
        {props.isMyProfile ? (
          <>
            <Tooltip title="Edit media">
              <div
                onClick={() => {
                  if (editing && editingState) {
                    setEditing(!editing);
                    setTimeout(() => setEditingState(!editingState), 1000);
                  } else if (!editing && !editingState) {
                    setEditingState(!editingState);
                    setTimeout(() => setEditing(!editing), 50);
                  } else {
                    setEditingState(false);
                    setEditing(false);
                  }
                }}
                // onMouseUp={() => {
                //   setEditing(!editing);
                // }}
                className="display-top-right container-secondary"
              >
                <EditOutlined />
              </div>
            </Tooltip>
            <Uploader
              onUpload={async (
                file: any,
                type: string,
                mediaCategory: string
              ) => {
                if (media && props.projectID) {
                  const newMedia = [...media];
                  newMedia.push({
                    mediaType: mediaCategory,
                    link: file,
                    datePosted: '',
                    mediaName: '',
                    projectID: props.projectID,
                    userID: '',
                  });
                  await uploadMedia(file, type, mediaCategory);
                  setMedia(newMedia);
                }
              }}
            />
          </>
        ) : (
          ''
        )}
        {media && media.length > 1 ? (
          <>
            <div
              className="portfolio-hero-button display-left container-secondary"
              onClick={() => {
                if (media) {
                  slide > 0 ? setSlide(slide - 1) : setSlide(media.length - 1);
                }
              }}
            >
              &#8249;
            </div>
            <div
              className="portfolio-hero-button display-right container-secondary"
              onClick={() => {
                if (media) {
                  slide < media.length - 1 ? setSlide(slide + 1) : setSlide(0);
                }
              }}
            >
              &#8250;
            </div>
          </>
        ) : (
          <></>
        )}

        {editingState ? (
          !media || media?.length === 0 ? (
            <div>hi</div>
          ) : (
            <DragDropContext
              onDragEnd={({ destination, source }) => {
                if (!destination) return;
                if (
                  destination.droppableId === source.droppableId &&
                  destination.index === source.index
                )
                  return;

                if (media) {
                  const newMedia = [...media];
                  const movedMedia = newMedia[source.index];
                  newMedia.splice(source.index, 1);
                  newMedia.splice(destination.index, 0, movedMedia);
                  setMedia(newMedia);
                  // saveData();
                }
              }}
            >
              <div style={{ height: '100%' }}>
                <Droppable
                  droppableId={'0'}
                  type={'CARD'}
                  direction="horizontal"
                  isCombineEnabled={false}
                >
                  {(dropProvided) => (
                    <div
                      style={{ height: '100%' }}
                      {...dropProvided.droppableProps}
                    >
                      <div
                        className={editing ? 'container-scroll-x' : ''}
                        style={{ height: '100%', display: 'flex' }}
                        ref={dropProvided.innerRef}
                      >
                        {media ? (
                          media.map((value, index) => {
                            if (value.mediaType === 'image') {
                              return (
                                <Draggable
                                  key={value.link}
                                  draggableId={value.link}
                                  index={index}
                                >
                                  {(dragProvided) => (
                                    <div
                                      {...dragProvided.dragHandleProps}
                                      {...dragProvided.draggableProps}
                                      ref={dragProvided.innerRef}
                                    >
                                      <div
                                        className={`
                                        portfolio-hero-media container-secondary
                                        ${
                                          slide === index
                                            ? 'portfolio-hero-media-max'
                                            : ''
                                        }
                                    `}
                                        style={{
                                          backgroundImage: `url(${value.link})`,
                                        }}
                                      >
                                        <Tooltip
                                          title="Remove"
                                          placement="bottom"
                                        >
                                          <div
                                            className="exit-button"
                                            onClick={() => {
                                              const newMedia = [...media];
                                              newMedia.splice(index, 1);
                                              setMedia(newMedia);
                                              // saveData();
                                              // Remove
                                            }}
                                          ></div>
                                        </Tooltip>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            } else {
                              return (
                                <Draggable
                                  key={value.link}
                                  draggableId={value.link}
                                  index={index}
                                >
                                  {(dragProvided) => (
                                    <div
                                      {...dragProvided.dragHandleProps}
                                      {...dragProvided.draggableProps}
                                      ref={dragProvided.innerRef}
                                    >
                                      <div
                                        className={`portfolio-hero-media container-secondary
                                      ${
                                        slide === index
                                          ? 'portfolio-hero-media-max'
                                          : ''
                                      }
                                      `}
                                      >
                                        <Tooltip
                                          title="Remove"
                                          placement="bottom"
                                        >
                                          <div
                                            className="exit-button"
                                            onClick={() => {
                                              const newMedia = [...media];
                                              newMedia.splice(index, 1);
                                              setMedia(newMedia);
                                              // saveData();
                                              // Remove
                                            }}
                                          ></div>
                                        </Tooltip>
                                        {index === 0 ? (
                                          <div>
                                            <br />
                                            <br />
                                            <br />
                                            Warning,
                                            <br />
                                            <strong>{value.mediaType}</strong>
                                            &nbsp;can not be
                                            <br />a thumbnail.
                                          </div>
                                        ) : (
                                          <div>
                                            <br />
                                            <br />
                                            <br />
                                            Embedded
                                            <br />
                                            <strong>{value.mediaType}</strong>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            }
                          })
                        ) : (
                          <></>
                        )}
                        {dropProvided.placeholder}
                        {/* <div className="portfolio-hero-media container-secondary">add</div> */}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>
          )
        ) : (
          <div style={{ height: '100%', display: 'flex' }}>
            {media && media.length > 0 ? (
              media.map((value, index) => {
                if (value.mediaType === 'image') {
                  return (
                    <div
                      className={`portfolio-hero-media container-secondary ${
                        slide === index ? 'portfolio-hero-media-max' : ''
                      }`}
                      style={{ backgroundImage: `url(${value.link})` }}
                    ></div>
                  );
                } else if (value.mediaType === 'video') {
                  return (
                    <div
                      className={`portfolio-hero-media container-secondary ${
                        slide === index ? 'portfolio-hero-media-max' : ''
                      }`}
                    >
                      <video width="100%" height="100%" controls>
                        <source src={`${value.link}`} />
                      </video>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className={`portfolio-hero-media container-secondary ${
                        slide === index ? 'portfolio-hero-media-max' : ''
                      }`}
                    >
                      <embed src={`${value.link}`} width="100%" height="100%" />
                    </div>
                  );
                }
              })
            ) : (
              <></>
              // <div
              //   className={`portfolio-hero-media container-secondary ${
              //     slide === 0 ? 'portfolio-hero-media-max' : ''
              //   }`}
              //   style={{ backgroundImage: `url(${placeholderFolioImage})` }}
              // ></div>
            )}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div
        className={`portfolio-hero`}
        style={{
          backgroundImage: `url(${
            media && media.length > 0 && media[0].mediaType === 'image'
              ? media[0].link
              : placeholderFolioImage
          })`,
        }}
      ></div>
    );
  }
}

export default PortfolioHero;
