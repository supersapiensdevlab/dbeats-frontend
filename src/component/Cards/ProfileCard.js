import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Verified } from '../../assets/icons/verified-account.svg';
import logo from '../..//assets/images/logo.svg';

// components

export default function ProfileCard({ user }) {
  return (
    <>
      {user ? (
        <div className="mb-4 ">
          <>
            <div>
              <div className="flex items-center  text-center bg-gradient-to-br from-dbeats-dark-alt to-dbeats-dark-secondary p-0.5  sm:rounded-xl nm-flat-dbeats-dark-primary">
                <div className=" dark:text-gray-50  pb-4    border-opacity-30  shadow-sm dark:shadow-md  bg-gradient-to-br from-dbeats-dark-secondary to-dbeats-dark-primary  text-dbeats-dark-primary sm:rounded-xl   w-full ">
                  <div className="flex items-center h-max w-full justify-center">
                    <div className=" ">
                      <div className="   sm:rounded-lg pb-3">
                        <Link
                          className="relative align-middle   justify-items-center items-center nm-flat-dbeats-dark-primary"
                          to={`/profile/${user.username}`}
                        >
                          <div className="">
                            <img
                              className="w-full h-28 rounded-t-lg"
                              src={
                                user.cover_image !== ''
                                  ? user.cover_image
                                  : 'http://placekitten.com/1200/400'
                              }
                              alt={user.name}
                            />
                          </div>

                          <div className=" photo-wrapper  rounded-full ">
                            <img
                              className="w-24 h-24  rounded-full mx-auto p-1 nm-flat-dbeats-dark-primary -mt-14 "
                              src={user.profile_image !== '' ? user.profile_image : logo}
                              alt={user.username}
                            />
                          </div>
                          <button className=" my-2 items-center align-middle text-center nm-flat-dbeats-dark-primary w-28 rounded-3xl p-1 hover:nm-inset-dbeats-dark-primary">
                            <div className="items-center  align-middle text-center bg-dbeats-dark-secondary rounded-3xl hover:nm-inset-dbeats-dark-secondary">
                              <i className="fas fa-user-plus mr-1 text-xs text-center"></i>follow
                            </div>
                          </button>
                        </Link>
                        <div className="p-2">
                          <p className="truncate   text-center flex justify-center  text-dbeats-dark-primary dark:text-gray-200 2xl:font-bold lg:text-sm">
                            {user.name}
                            {user.is_verified ? (
                              <Verified className="h-4 w-4  items-center self-center justify-center text-dbeats-light mx-1" />
                            ) : null}
                          </p>
                          <p className="  2xl:text-sm lg:text-xs text-gray-400 text-center hidden">
                            {' '}
                            {user.username}{' '}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <p className="text-gray-400 text-center 2xl:font-bold lg:text-sm">
                              Owns
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-center 2xl:font-bold lg:text-sm">
                              Followers
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-400 text-center 2xl:font-bold lg:text-sm">
                              Following
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3">
                          <div className="text-center">
                            <p className="text-gray-500 text-center">
                              {user.videos.length + user.posts.length + user.tracks.length}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-500 text-center">
                              {user.follower_count.length}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-500 text-center">
                              {user.followee_count.length}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      ) : null}
    </>
  );
}
