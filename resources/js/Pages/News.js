import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import { Button, Divider, Text, Grid, GridItem } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import moment from 'moment';

export default function News(props) {
    const { posts } = props
    return (
        <>
            <Head title="RED METRIC | Pers" />
            <header className="flex flex-wrap items-center justify-between px-12 h-32 -mb-32 relative">
                <ul className="order-last md:order-first flex-1 flex justify-center md:justify-start list-reset">
                    <li>
                        <a href={route('welcome')} className="text-sm text-grey-darker no-underline hover:text-red-500">
                            Beranda
                        </a>
                    </li>
                    <li className="ml-8">
                        <a href={route('about-us')} className="text-sm text-grey-darker no-underline hover:text-red-500">
                            Tentang
                        </a>
                    </li>
                    <li className="ml-8">
                        <a href={route('news')} className="text-sm text-grey-darker underline hover:text-red-500">
                            Pers
                        </a>
                    </li>
                </ul>
                <div className="w-full md:w-auto flex justify-center">
                    <a href={route('welcome')} className="block text-center text-red-500 text-lg no-underline">
                        <img src="/images/logo.png" alt={props?.appName} className="w-50 h-auto" />
                    </a>
                </div>
                <ul className="flex-1 flex justify-center md:justify-end list-reset">
                    <li className="ml-8 hidden md:inline">
                        <Link href={props.auth.user ? route('dashboard') : route('login')}>
                            <span className="text-sm font-bold px-4 py-3 no-underline text-white bg-red-500 hover:bg-black">
                                {props.auth.user ? 'Dashboard' : 'Login'}
                            </span>
                        </Link>
                    </li>
                </ul>
            </header>

            <div className="max-w-5xl mx-auto px-4 pb-28 sm:px-6 md:px-8 xl:px-12 xl:max-w-6xl pt-28">
                <header className="pt-16 pb-9 sm:pb-16 sm:text-center">
                    <h1 className="mb-4 text-3xl sm:text-4xl tracking-tight text-gray-900 font-extrabold dark:text-gray-200">Pers</h1>
                    <p className="text-lg text-gray-700 dark:text-gray-400">
                        Semua kabar terbaru dan pembaharuan seputar RED METRIC
                    </p>
                </header>
                {posts?.map((post, px) => (
                    <div key={px}>
                        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                            <GridItem>
                                <Text fontSize="sm" align="right">
                                    {moment(post?.created_at).format("DD MMMM YYYY")}
                                </Text>
                            </GridItem>
                            <GridItem colSpan={3}>
                                <h3 className="text-xl text-gray-900 tracking-tight font-bold dark:text-gray-200">
                                    {post?.title}
                                </h3>
                                <div className="mb-6 prose dark:prose-dark">
                                    <p>{post?.excerpt}</p>
                                </div>
                                <div className="mt-auto flex flex-row-reverse items-center justify-end">
                                    <Link href={route('news.read', post)}>
                                        <Button rightIcon={<ArrowForwardIcon />} colorScheme="teal" variant="outline" size="sm">
                                            Baca Selengkapnya
                                        </Button>
                                    </Link>
                                </div>
                            </GridItem>
                        </Grid>
                        <div className="mb-4 mt-4">
                            <Divider orientation="horizontal" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
