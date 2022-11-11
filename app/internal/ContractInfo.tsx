"use client";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { AspectRatio, Box, Image, Stack, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Data } from "../page";
import Script from "next/script";

const Wrapper = styled.div`
  min-height: 100vh;
  --parallelowow-tile-width: 70;
  --parallelowow-base-color: rgb(167, 51, 230);
  --parallelowow-color-step: 2;
  --parallelowow-probability: 0.8;
  --parallelowow-stroke-weight: -1;
  background: paint(parallelowow), var(--parallelowow-base-color);
`;

const PolygonMask = styled(AspectRatio)`
  --avatar-sides: 6;
  -webkit-mask-image: paint(avatar-polygon);
  mask-image: paint(avatar-polygon);
`;

type Props = Data;

export const ContractInfo: React.FC<Props> = ({
  name,
  symbol,
  totalSupply,
}) => {
  const [tokenImageList, setTokenImageList] = useState<string[]>([]);

  useEffect(() => {
    const arr = [];
    for (let i = 1; i <= totalSupply; i++) {
      arr.push(`https://pfp.konojunya.com/image/nft/${i}.png`);
    }

    setTokenImageList(arr);
  }, [totalSupply]);

  // import css houdini
  useEffect(() => {
    window.CSS.paintWorklet.addModule(
      "https://unpkg.com/houdini-avatar-polygon@1.0.0"
    );

    window.CSS.paintWorklet.addModule("https://unpkg.com/parallelowow@0.1.5");
  }, []);

  return (
    <Wrapper>
      <Box p={[10]} maxW="500px" mx="auto">
        <Text align="center" fontWeight="bold" textStyle={["default-dense-24"]}>
          {name}({symbol})
        </Text>

        <Text align="center" mt={[3]}>
          <Link href="https://etherscan.io/address/0xff92bfec6cdb4aafcd3fe2456541be3a4f1eda47">
            Etherscan <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>

        <Stack w="100%" align="center" spacing={5} mt={[5]}>
          {tokenImageList.map((src) => {
            return (
              <PolygonMask
                key={src}
                w="100%"
                boxShadow="1px 1px 5px rgba(255,255,255,0.4)"
                _notFirst={{ width: "60%" }}
                style={{ aspectRatio: 1 }}
              >
                <Image src={src} alt="" />
              </PolygonMask>
            );
          })}
        </Stack>

        <Script
          strategy="beforeInteractive"
          src="https://unpkg.com/css-paint-polyfill"
        />
      </Box>
    </Wrapper>
  );
};
