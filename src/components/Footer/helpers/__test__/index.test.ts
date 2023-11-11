import { injectPropsOnColumnProps } from "..";
import { ColumnProps, ColumnPropsArray, ColumnPropsSections } from "../..";
import { defaultColumnData } from "../../components/Column/constants";
import { Routes } from "../../components/Column/utils";
import { legalSectionColumnData } from "../../components/ContactDetails/components/LegalSection/constants";
import { socialMediaIconsColumnData } from "../../components/ContactDetails/components/SocialMediaIcons/constants";
import { TextLink } from "../../components/TextLink/types";
import { defaultLowerSectionColumnData } from "../../Footer";

describe("Footer utils", () => {
  //Using subsections of default data for easier testing

  describe("injectPropsOnColumnProps", () => {
    const customBase = "https://new-domain.com";
    const customBase2 = "https://new-domain2.com";

    const baseUrls = {
      [defaultColumnData[2].content_group!]: { baseUrl: Routes.WEBSITE_DEV },
      [defaultColumnData[3].content_group!]: { baseUrl: Routes.WEBSITE_DEV },
      [legalSectionColumnData!.content_group!]: { baseUrl: customBase },
      [socialMediaIconsColumnData!.content_group!]: { baseUrl: customBase2 },
    };

    describe("Modifying columnProps", () => {
      describe("Checking on the 'all' option (apply the props to all the available link columns)", () => {
        it("Should return the columnData array with the onClick and onClickGroup inserted", () => {
          const res = injectPropsOnColumnProps(defaultColumnData, {
            all: { onClick: jest.fn(), onClickGroup: jest.fn() },
          }) as ColumnPropsArray;

          for (const data of res) {
            expect(data.onClick).not.toBeUndefined();
            expect(data.onClickGroup).not.toBeUndefined();
          }
        });

        it("Should return the columnData object with the onClick and onClickGroup inserted", () => {
          const res = injectPropsOnColumnProps(defaultLowerSectionColumnData, {
            all: { onClick: jest.fn(), onClickGroup: jest.fn() },
          }) as ColumnPropsSections;

          for (const data of Object.values(res)) {
            expect(data.onClick).not.toBeUndefined();
            expect(data.onClickGroup).not.toBeUndefined();
          }
        });
      });

      it("Should return the columnData intact if the second argument baseUrls is undefined or not passed", () => {
        let res = injectPropsOnColumnProps(defaultColumnData);
        expect(res).toEqual(defaultColumnData);

        res = injectPropsOnColumnProps(defaultColumnData, undefined);
        expect(res).toEqual(defaultColumnData);

        res = injectPropsOnColumnProps(defaultColumnData, undefined, undefined);
        expect(res).toEqual(defaultColumnData);

        res = injectPropsOnColumnProps(defaultLowerSectionColumnData);
        expect(res).toEqual(defaultLowerSectionColumnData);

        res = injectPropsOnColumnProps(
          defaultLowerSectionColumnData,
          undefined
        );
        expect(res).toEqual(defaultLowerSectionColumnData);

        res = injectPropsOnColumnProps(
          defaultLowerSectionColumnData,
          undefined,
          undefined
        );
        expect(res).toEqual(defaultLowerSectionColumnData);
      });

      it("Should return the columnData array with the urls that are there in the baseUrls if the section is found", () => {
        //First the blogInfo column's baseUrl is BLOG and pressInfo column's base doesn't have baseUrl

        expect(defaultColumnData[2].baseUrl).toBe(Routes.BLOG);
        expect(defaultColumnData[3].baseUrl).toBeUndefined();

        //And now aboutInfo column and pressInfo column's baseUrl are both Routes.WEBSITE_DEV
        const res = injectPropsOnColumnProps(
          defaultColumnData,
          baseUrls
        ) as ColumnPropsArray;

        expect(res[2].baseUrl).toBe(Routes.WEBSITE_DEV);
        expect(res[3].baseUrl).toBe(Routes.WEBSITE_DEV);
      });

      it("Should return the columnData object with the urls that are there in the baseUrls if the section is found", () => {
        //LegalSection info column now has customBase for baseUrl and socialSection has customBase2
        expect(defaultLowerSectionColumnData.legalSection!.baseUrl).toBe(
          Routes.WEBSITE_DEV
        );
        expect(
          defaultLowerSectionColumnData.socialMediaInfo!.baseUrl
        ).toBeUndefined();

        const res = injectPropsOnColumnProps(
          defaultLowerSectionColumnData,
          baseUrls
        ) as ColumnPropsSections;

        expect(res.legalSection!.baseUrl).toBe(customBase);
        expect(res.socialMediaInfo!.baseUrl).toBe(customBase2);
      });
    });

    describe("Modifying columnInfo", () => {
      const columnInfoPropsByColumnId: Record<string, Partial<TextLink>> = {
        about: { target: "_blank" },
        "legal section": { target: "_self" },
      };

      //The about section's links have target = '_self' by default

      const checkLinkValues = (data: ColumnProps) => {
        const content_group = data.content_group;
        if (content_group && columnInfoPropsByColumnId[content_group]) {
          for (const link of data.columnInfo) {
            expect(link.target).toBe(
              columnInfoPropsByColumnId[content_group].target
            );
          }
        }
      };

      it("Should return the columnData array with the links modified in the stated link column", () => {
        const res = injectPropsOnColumnProps(
          defaultColumnData,
          undefined,
          columnInfoPropsByColumnId
        ) as ColumnPropsArray;

        for (const data of res) {
          checkLinkValues(data);
        }
      });

      it("Should return the columnData object with the links modified in the stated link column", () => {
        const res = injectPropsOnColumnProps(
          defaultLowerSectionColumnData,
          undefined,
          columnInfoPropsByColumnId
        ) as ColumnPropsSections;

        for (const data of Object.values(res)) {
          checkLinkValues(data);
        }
      });
    });
  });
});
