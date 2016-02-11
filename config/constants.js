
module.exports.constants = {
    user: {
        STATUS_ACTIVE: 'active',
        STATUS_INACTIVE: 'inactive',
        STATUS_BLOCK: 'block',
        STATUS_DELETE: 'delete',
        DELETED_BY_USER: 'user',
        DELETED_BY_ADMIN: 'admin',
        EMAIL_VERIFIED: 'verified',
        EMAIL_NOTVERIFIED: 'notverified',
        SUBSCRIPTION_FREE: 'free',
        SUBSCRIPTION_PAID: 'paid',
        REFERRAL_UNABLE: 'unable',
        REFERRAL_CLAIMABLE: 'claimable',
        REFERRAL_CLAIMED: 'claimed',
        BLACKLIST_NO: 'no',
        BLACKLIST_YES: 'yes'
    },
    subscription: {
        STATUS_ACTIVE: 'active',
        STATUS_INACTIVE: 'inactive',
        STATUS_DELETE: 'delete'
    },
    userinfo: {
        GENDER_MALE: 'male',
        GENDER_FEMALE: 'female',
        GENDER_MALE_FEMALE_COUPLE: 'male_female_couple',
        GENDER_GAY_COUPLE: 'gay_couple',
        GENDER_LESBIAN_COUPLE: 'lesbian_couple',
        USER_LEVEL_PROFESSIONAL_CMT: 'professional_body_worker_or_CMT',
        USER_LEVEL_STUDENT: 'massage_student',
        USER_LEVEL_AFICIONADO: 'aficionado',
        EXPERIENCE_NONE: 'none_at_all',
        EXPERIENCE_0_TO_1: '0-1',
        EXPERIENCE_1_TO_2: '1-2',
        EXPERIENCE_2_TO_5: '2-5',
        EXPERIENCE_5_TO_10: '5-10',
        EXPERIENCE_10_TO_20: '10-20',
        EXPERIENCE_MORE_THAN_20: 'more_than_20_years',
        BODYTYPE_MUSCULAR: 'muscular',
        BODYTYPE_GYMFIT: 'gymfit',
        BODYTYPE_AVERAGE: 'average',
        BODYTYPE_SLENDER: 'slender',
        BODYTYPE_EXTRA_POUNDS: 'few_extra_pounds',
        BODYTYPE_QUESTION_NOT_IMPORTANT: 'this_question_is_not_important',
        MASSAGE_FREQUENCY_DAILY: 'daily_or_almost_daily',
        MASSAGE_FREQUENCY_ONCE_A_WEEK: 'about_once_a_week',
        MASSAGE_FREQUENCY_EVERY_WEEK: 'every_few_weeks',
        MASSAGE_FREQUENCY_ONCE_A_MONTH: 'about_once_a_month',
        MASSAGE_FREQUENCY_EVERY_MONTH: 'every_few_months',
        MASSAGE_FREQUENCY_EVERY_SIX_MONTH: 'about_every_six_months',
        MASSAGE_FREQUENCY_ONCE_A_YEAR: 'about_once_a_year',
        DRINKING_GAVE_IT_UP: 'gave_it_up',
        DRINKING_SOCIALLY: 'socially',
        DRINKING_REGULARLY: 'regularly',
        DRINKING_NON_ALCOHOLIC: 'non_alcoholic_beverages_only',
        SMOKING_NEVER: 'never',
        SMOKING_EX_SMOKER: 'ex-smoker',
        SMOKING_OCCASIONALLY: 'occasionally',
        SMOKING_DAILY: 'daily',
        SMOKING_SOCIALLY: 'socially',
        SMOKING_TELL_YOU_LATER: 'i_will_tell_you_later',
        TRAINING_HOURS_FORMAL: 'no_formal_training',
        TRAINING_HOURS_UNDER_100: 'under_100hours',
        TRAINING_HOURS_101_TO_200: '101-200hours',
        TRAINING_HOURS_201_TO_300: '201-300hours',
        TRAINING_HOURS_301_TO_500: '301-500hours',
        TRAINING_HOURS_501_TO_1000: '501-1000hours',
        TRAINING_HOURS_MORE_THAN_1000: 'more_than_1000hours',
        THERAPEUTIC_YES: 'yes',
        THERAPEUTIC_NO: 'no',
        SENSUAL_YES: 'yes',
        SENSUAL_NO: 'no',
    },
    video: {
        ACCESS_TYPE_PRIVATE: 'private',
        ACCESS_TYPE_PUBLIC: 'public',
        STATUS_ACTIVE: 'active',
        STATUS_INACTIVE: 'inactive',
        STATUS_DELETE: 'delete'
    },
    photo: {
        ACCESS_TYPE_PRIVATE: 'private',
        ACCESS_TYPE_PUBLIC: 'public',
        STATUS_ACTIVE: 'active',
        STATUS_INACTIVE: 'inactive',
        STATUS_DELETE: 'delete'
    },

    review: {
        REVIEW_STATUS_APPROVED: 'approved',
        REVIEW_STATUS_NOTAPPROVED: 'notapproved'
    },


    admin: {

        ADMIN_TYPE_SUPERADMIN     : 'super_admin',
        ADMIN_TYPE_SUBADMIN       : 'sub_admin',
        BLOCK_STATUS_BLOCK        : 'block',
        BLOCK_STATUS_ACTIVE       : 'active',
        BLOCK_STATUS_DELETE       : 'delete',

    },

    conversation: {

        REQUEST_STATUS_ACCEPT      : 'accept',
        REQUEST_STATUS_DECLINE     : 'decline',
        REQUEST_STATUS_BLOCK       : 'block',

    },

    mail: {

        SENDER_STATUS_SENT           : 'sent',
        SENDER_STATUS_DRAFT          : 'draft',
        SENDER_STATUS_TRASH          : 'trash',
        SENDER_STATUS_FOLDER         : 'folder',
        SENDER_STATUS_DELETE         : 'delete',

        RECEIVER_STATUS_INBOX        : 'inbox',
        RECEIVER_STATUS_TRASH        : 'trash',
        RECEIVER_STATUS_FOLDER       : 'folder',
        RECEIVER_STATUS_DELETE       : 'delete',

        VIEW_STATUS_TRUE             : 'true',
        VIEW_STATUS_FALSE            : 'false',

    },

    blog: {

        AUTHOR_TYPE_SUPERADMIN     : 'super_admin',
        AUTHOR_TYPE_SUBADMIN       : 'sub_admin',
        AUTHOR_TYPE_USER           : 'user',

        BLOG_STATUS_ACTIVE         : 'active',
        BLOG_STATUS_INACTIVE       : 'inactive',

        APPROVAL_STATUS_PENDING    : 'pending',
        APPROVAL_STATUS_APPROVED   : 'approved',
        APPROVAL_STATUS_REJECTED   : 'rejected',

    },

    poll: {

        AUTHOR_TYPE_SUPERADMIN     : 'super_admin',
        AUTHOR_TYPE_SUBADMIN       : 'sub_admin',
        AUTHOR_TYPE_USER           : 'user',

        POLL_STATUS_ACTIVE         : 'active',
        POLL_STATUS_INACTIVE       : 'inactive',

        COMMENT_STATUS_SHOW        : 'active',
        COMMENT_STATUS_HIDE        : 'inactive',

        APPROVAL_STATUS_PENDING    : 'pending',
        APPROVAL_STATUS_APPROVED   : 'approved',
        APPROVAL_STATUS_REJECTED   : 'rejected',

        ANSWER_TYPE_RADIOBUTTON    : 'radiobutton',
        ANSWER_TYPE_CHECKBOX       : 'checkbox',


    },

    pollDetails: {

        APPROVAL_STATUS_APPROVED   : 'approved',
        APPROVAL_STATUS_REJECTED   : 'rejected',

    },

    adUser: {

        BANNER_TYPE_THERAPEUTIC   : 'therapeutic',
        BANNER_TYPE_SENSUAL       : 'sensual',

        ADUSER_STATUS_ACTIVE      : 'active',
        ADUSER_STATUS_INACTIVE    : 'inactive',
        ADUSER_STATUS_DELETE      : 'delete',

    },

     userSettings: {

        SEARCH_PROFILE_STATUS_ENABLE        : 'enable',
        SEARCH_PROFILE_STATUS_DISABLE       : 'disable',

        SENSUAL_ADSTATUS_ENABLE             :  'enable',
        SENSUAL_ADSTATUS_DISABLE            : 'disable',

        AUTO_LOGIN_ENABLE                   : 'enable',
        AUTO_LOGIN_DISABLE                  : 'disable',

        SET_OFFLINE_ENABLE                  : 'enable',
        SET_OFFLINE_DISABLE                 : 'disable',

        FAVOURITE_MAIL_STATUS_ENABLE        : 'enable',
        FAVOURITE_MAIL_STATUS_DISABLE       : 'disable',

        PROVISIT_MAIL_STATUS_ENABLE         : 'enable',
        PROVISIT_MAIL_STATUS_DISABLE        : 'disable',

        NEW_MAIL_STATUS_ENABLE              : 'enable',
        NEW_MAIL_STATUS_DISABLE             : 'disable',

        POLL_MAIL_STATUS_ENABLE             : 'enable',
        POLL_MAIL_STATUS_DISABLE            : 'disable',


    },

    adPage: {

        STATUS_ACTIVE                        : 'active',
        STATUS_INACTIVE                      : 'inactive',
    },

    adPosition: {

        STATUS_ACTIVE                        : 'active',
        STATUS_INACTIVE                      : 'inactive',
    },

    cmsPage: {

        STATUS_ACTIVE                        : 'active',
        STATUS_INACTIVE                      : 'inactive',
    },







};
