///
/// Copyright (c) 2016 Dropbox, Inc. All rights reserved.
///
/// Auto-generated by Stone, do not modify.
///

#import <Foundation/Foundation.h>

#import "DBSerializableProtocol.h"

@class DBTEAMLOGSharedLinkAccessLevel;

NS_ASSUME_NONNULL_BEGIN

#pragma mark - API Object

///
/// The `SharedLinkAccessLevel` union.
///
/// Shared link access level.
///
/// This class implements the `DBSerializable` protocol (serialize and
/// deserialize instance methods), which is required for all Obj-C SDK API route
/// objects.
///
@interface DBTEAMLOGSharedLinkAccessLevel : NSObject <DBSerializable, NSCopying>

#pragma mark - Instance fields

/// The `DBTEAMLOGSharedLinkAccessLevelTag` enum type represents the possible
/// tag states with which the `DBTEAMLOGSharedLinkAccessLevel` union can exist.
typedef NS_ENUM(NSInteger, DBTEAMLOGSharedLinkAccessLevelTag) {
  /// (no description).
  DBTEAMLOGSharedLinkAccessLevelNone,

  /// (no description).
  DBTEAMLOGSharedLinkAccessLevelReader,

  /// (no description).
  DBTEAMLOGSharedLinkAccessLevelWriter,

  /// (no description).
  DBTEAMLOGSharedLinkAccessLevelOther,

};

/// Represents the union's current tag state.
@property (nonatomic, readonly) DBTEAMLOGSharedLinkAccessLevelTag tag;

#pragma mark - Constructors

///
/// Initializes union class with tag state of "none".
///
/// @return An initialized instance.
///
- (instancetype)initWithNone;

///
/// Initializes union class with tag state of "reader".
///
/// @return An initialized instance.
///
- (instancetype)initWithReader;

///
/// Initializes union class with tag state of "writer".
///
/// @return An initialized instance.
///
- (instancetype)initWithWriter;

///
/// Initializes union class with tag state of "other".
///
/// @return An initialized instance.
///
- (instancetype)initWithOther;

- (instancetype)init NS_UNAVAILABLE;

#pragma mark - Tag state methods

///
/// Retrieves whether the union's current tag state has value "none".
///
/// @return Whether the union's current tag state has value "none".
///
- (BOOL)isNone;

///
/// Retrieves whether the union's current tag state has value "reader".
///
/// @return Whether the union's current tag state has value "reader".
///
- (BOOL)isReader;

///
/// Retrieves whether the union's current tag state has value "writer".
///
/// @return Whether the union's current tag state has value "writer".
///
- (BOOL)isWriter;

///
/// Retrieves whether the union's current tag state has value "other".
///
/// @return Whether the union's current tag state has value "other".
///
- (BOOL)isOther;

///
/// Retrieves string value of union's current tag state.
///
/// @return A human-readable string representing the union's current tag state.
///
- (NSString *)tagName;

@end

#pragma mark - Serializer Object

///
/// The serialization class for the `DBTEAMLOGSharedLinkAccessLevel` union.
///
@interface DBTEAMLOGSharedLinkAccessLevelSerializer : NSObject

///
/// Serializes `DBTEAMLOGSharedLinkAccessLevel` instances.
///
/// @param instance An instance of the `DBTEAMLOGSharedLinkAccessLevel` API
/// object.
///
/// @return A json-compatible dictionary representation of the
/// `DBTEAMLOGSharedLinkAccessLevel` API object.
///
+ (nullable NSDictionary<NSString *, id> *)serialize:(DBTEAMLOGSharedLinkAccessLevel *)instance;

///
/// Deserializes `DBTEAMLOGSharedLinkAccessLevel` instances.
///
/// @param dict A json-compatible dictionary representation of the
/// `DBTEAMLOGSharedLinkAccessLevel` API object.
///
/// @return An instantiation of the `DBTEAMLOGSharedLinkAccessLevel` object.
///
+ (DBTEAMLOGSharedLinkAccessLevel *)deserialize:(NSDictionary<NSString *, id> *)dict;

@end

NS_ASSUME_NONNULL_END