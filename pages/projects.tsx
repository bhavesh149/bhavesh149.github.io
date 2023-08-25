import React from 'react';
import { Box, Button, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { NextSeo } from 'next-seo';
import LineHeading from '@/components/LineHeading';
import RepoCard from '@/components/RepoCard';
import PinnedProjects from '@/components/PinnedProjects';
import { pinnedRepos, pinnedRepoType } from '@/data/pinnedRepos';
import { repoType } from '@/pages/api/github';

interface ProjectsProps {
  stars: number;
  repos: repoType[];
  followers: number;
  revalidate?: number;
  error?: string;
}

function Projects({ repos }: ProjectsProps): React.ReactElement {
  return (
    <>
      <NextSeo title="Projects" />
      <Box
        width="full"
        px={3}
        minH="100vh"
        height="full"
        mx="auto"
        maxW="6xl"
        py="28"
      >
        <Flex
          direction="column"
          alignItems="center"
          width="full"
          px={3}
          height="full"
          mx="auto"
        >
          <LineHeading
            fontSize={{ base: `5xl`, md: `6xl` }}
            mx="auto"
            textAlign="center"
          >
            My projects
          </LineHeading>
          <Text mt={3}>A quick collection of my projects.</Text>
          <VStack
            direction="column"
            my={16}
            width="full"
            height="full"
            maxWidth="5xl"
            spacing={10}
          >
            {pinnedRepos
              .sort(
                (a: pinnedRepoType, b: pinnedRepoType) =>
                  new Date(
                    repos.find(
                      (x: repoType) => x.name.toLowerCase() === a.id.toLowerCase()
                    )?.created_at ?? 0
                  ).getTime() -
                  new Date(
                    repos.find(
                      (y: repoType) => y.name.toLowerCase() === b.id.toLowerCase()
                    )?.created_at ?? 0
                  ).getTime()
              )

              .reverse()
              .map((data: pinnedRepoType, index) => (
                <PinnedProjects
                  key={index.toString()}
                  repo={repos.find(
                    (x: repoType) =>
                      x.name.toLowerCase() === data.id.toLowerCase()
                  )}
                  left={index % 2 === 0}
                  projectData={data}
                />
              ))
              }
          </VStack>
          <LineHeading fontSize={{ base: `5xl`, lg: `5xl` }} textAlign="center">
            Repositories
          </LineHeading>
          <Text mt={3}>
            A list of all of the public repositories on my GitHub.
          </Text>
          <Button
            as="a"
            href="https://github.com/bhavesh149"
            variant="ghost"
            colorScheme="brand"
            size="lg"
            mt={5}
            leftIcon={<FaGithub />}
          >
            View My Profile
          </Button>

        </Flex>

        <SimpleGrid
          mt={10}
          columns={{ base: 1, md: 2 }}
          width="full"
          height="full"
          maxH="full"
          mx="auto"
          gridAutoRows="1fr"
          spacingX={10}
          spacingY={8}
          isTruncated
          overflow="visible"
        >
          {repos
            .sort(
              (a: any, b: any) =>
                new Date(a.pushed_at).getTime() -
                new Date(b.pushed_at).getTime()
            )
            .reverse()
            .map((repo: repoType, index: number) => (
              <RepoCard key={index.toString()} repo={repo} i={index} />
            ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

export async function getStaticProps(): Promise<{ props: ProjectsProps }> {
  let error = null;
  let response = null;
  try {
    response = await fetch(
      `${
        process.env.NEXT_PUBLIC_HOST ||
        `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      }/api/github`
    );
    if (!response || !response.ok) {
      // If response is null or not ok, set the error
      error = response ? `${response.status} ${response.statusText}` : 'Error fetching data';
    } else {
      // If the response is ok, proceed with parsing JSON data
      const data = await response.json();
      const { stars, repos, followers } = data;

      return { props: { stars, repos, followers, revalidate: 600 } };
    }
  } catch (e) {
    console.error(e);
    error = 'There was an error fetching github stats';
  }

  // If there was an error or the response is not ok, return with props containing the error
  return { props: { stars: 0, followers: 0, repos: [], error } };
}


export default Projects;
