package com.fleafinder.persistence.entity;

public enum PermissionEnum {
    // Fair permissions
    CREATE_FAIR,
    READ_FAIR,
    UPDATE_FAIR,
    DELETE_FAIR,
    VALIDATE_FAIR,
    REQUEST_FAIR,

    // Product permissions
    CREATE_PRODUCT,
    READ_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,

    // Review permissions
    CREATE_REVIEW,
    READ_REVIEW,
    UPDATE_REVIEW,
    DELETE_REVIEW,
    REPORT_REVIEW,

    // Profile permissions
    READ_PROFILE,
    UPDATE_PROFILE,

    // Admin permissions
    MANAGE_REPORTS,
    MANAGE_USERS,
    SEND_ALERTS
}