import React, { useEffect } from 'react';
import { useState } from 'react';

import './PortfolioHero.css';
import { EditOutlined } from '@ant-design/icons';
import placeholderFolioImage from '../placeholder-folio-image.png';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Tooltip } from 'antd';
import Uploader from './Uploader';
import { stringList } from 'aws-sdk/clients/datapipeline';

type PortfolioHeroProps = {
  isOpen: boolean;
  isMyProfile: boolean;
  id: string;
};

type PortfolioHeroData = {
  type: string;
  url: any;
};

function PortfolioHero(props: PortfolioHeroProps) {
  const [editing, setEditing] = useState(false);
  const [editingState, setEditingState] = useState(false);
  const [slide, setSlide] = useState(0);
  const [media, setMedia] = useState<PortfolioHeroData[]>();
  // const [isLoading, setIsLoading] = useState(true);

  async function fetchData(): Promise<void> {
    // GET data
    let d: PortfolioHeroData[];
    if (props.id === '1') {
      d = [
        { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
        { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
        { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
        { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
        {
          type: 'pdf',
          url:
            'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        },
        {
          type: 'video',
          url:
            'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        },
      ];
    } else if (props.id === '2') {
      d = [
        { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
        { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
        { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
        { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
        {
          type: 'pdf',
          url:
            'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        },
        {
          type: 'video',
          url:
            'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        },
      ];
    } else if (props.id === '3') {
      d = [
        { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
        { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
        { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
        { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
        {
          type: 'pdf',
          url:
            'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        },
        {
          type: 'video',
          url:
            'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        },
      ];
    } else if (props.id === '4') {
      d = [
        { type: 'image', url: 'https://i.ibb.co/SwzRr9S/example3.png' },
        { type: 'image', url: 'https://i.ibb.co/BNZxQ2z/example0.jpg' },
        { type: 'image', url: 'https://i.ibb.co/TYYyXDH/example1.png' },
        { type: 'image', url: 'https://i.ibb.co/pZmXQb5/example2.png' },
        {
          type: 'pdf',
          url:
            'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        },
        {
          type: 'video',
          url:
            'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4',
        },
      ];
    } else {
      d = [];
    }
    setMedia(d);
  }

  // EDIT ME
  async function saveData(): Promise<void> {
    // PUT data
  }

  useEffect(() => {
    fetchData();
  }, [props.id]);

  // props.isOpen ?
  if (props.isOpen) {
    return (
      <div
        className={`portfolio-hero  ${
          editing ? 'portfolio-hero-edit container-scroll' : ''
        }`}
      >
        {props.isMyProfile ? (
          <>
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
            <Uploader
              onUpload={(file: any, typeName: string) => {
                if (media) {
                  const newMedia = [...media];
                  newMedia.push({
                    type: typeName,
                    url: file,
                  });
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
                saveData();
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
                          if (value.type === 'image') {
                            return (
                              <Draggable
                                key={value.url}
                                draggableId={value.url}
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
                                        backgroundImage: `url(${value.url})`,
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
                                            saveData();
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
                                key={value.url}
                                draggableId={value.url}
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
                                            saveData();
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
                                          <strong>{value.type}</strong>
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
                                          <strong>{value.type}</strong>
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
        ) : (
          <div style={{ height: '100%', display: 'flex' }}>
            {media && media.length > 0 ? (
              media.map((value, index) => {
                if (value.type === 'image') {
                  return (
                    <div
                      className={`portfolio-hero-media container-secondary ${
                        slide === index ? 'portfolio-hero-media-max' : ''
                      }`}
                      style={{ backgroundImage: `url(${value.url})` }}
                    ></div>
                  );
                } else if (value.type === 'video') {
                  return (
                    <div
                      className={`portfolio-hero-media container-secondary ${
                        slide === index ? 'portfolio-hero-media-max' : ''
                      }`}
                    >
                      <video width="100%" height="100%" controls>
                        <source src={`${value.url}`} />
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
                      <embed src={`${value.url}`} width="100%" height="100%" />
                    </div>
                  );
                }
              })
            ) : (
              <div
                className={`portfolio-hero-media container-secondary ${
                  slide === 0 ? 'portfolio-hero-media-max' : ''
                }`}
                style={{ backgroundImage: `url(${placeholderFolioImage})` }}
              ></div>
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
            media && media.length > 0 && media[0].type === 'image'
              ? media[0].url
              : placeholderFolioImage
          })`,
        }}
      ></div>
    );
  }
}

export default PortfolioHero;
