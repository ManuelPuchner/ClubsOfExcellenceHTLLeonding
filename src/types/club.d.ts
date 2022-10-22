declare module "club" {
  type QandA = {
    question: string;
    answer: string;
  };
  type Club = {
    clubname: string;
    image: string;
    description: string;
    qanda: QandA[];
    adminId: string;
  }
  interface ClubsInfoState extends Club {
    setClubname: (clubName: string) => any;
    addQandAEmpty: () => any;
    editQandA: (key: any, value: string, index: number) => any;
    deleteQandA: (index: number) => any;
    imageName: string;
    setImage: (image: string) => any;
    setImageName: (image: string) => any;
    setDescription: (about: string) => any;
    setAdminId: (adminId: string) => any;
  }
}
